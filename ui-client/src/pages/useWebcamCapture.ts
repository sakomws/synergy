import { useRef, useCallback } from "react";
import { dataURItoBlob } from "../scripts/dataURItoBlob";
import { fetchHumeJobPredictions } from "../scripts/fetchHumeJobPredictions";

// Define the hook
const useWebcamCapture = (apiKey: string) => {
  const webcamRef = useRef(null);

  // Method to capture image from webcam
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        return dataURItoBlob(imageSrc); // Assuming dataURItoBlob function is defined globally
      }
    }
    return null;
  }, [webcamRef]);

  // Method to send captured image to an API
  const sendToAPI = async (imageBlob: Blob) => {
    if (!imageBlob) {
      alert("No image captured");
      return;
    }

    const formData = new FormData();
    formData.append("json", JSON.stringify({ models: { face: {} } }));
    formData.append("file", imageBlob, "capture.jpeg");

    try {
      const response = await fetch("https://api.hume.ai/v0/batch/jobs", {
        method: "POST",
        headers: {
          "X-Hume-Api-Key": apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
      return data; // Returning data might be useful for the component
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrowing the error to handle it in the component if needed
    }
  };

  return { webcamRef, capture, sendToAPI };
};

export default useWebcamCapture;

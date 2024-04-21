import React, { forwardRef, useImperativeHandle } from "react";
import Webcam from "react-webcam";
import useWebcamCapture from "../pages/useWebcamCapture";
import { storeJobIdAndStateInLocalStorage } from "../scripts/jobIdsLocalStorage";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const WebCamCapture = forwardRef((props, ref) => {
  const { webcamRef, capture, sendToAPI } = useWebcamCapture(import.meta.env.VITE_HUME_API_KEY);

  const handleCaptureAndSend = async (state) => {
    try {
      const imageBlob = capture();
      if (imageBlob) {
        const jobId = await sendToAPI(imageBlob);
        storeJobIdAndStateInLocalStorage(jobId, state);
        console.log("API Response jobId:", jobId);
      } else {
        console.log("No image captured");
      }
    } catch (error) {
      console.log("Failed to send image:", error);
    }
  };

  // Use useImperativeHandle to expose the capture function
  useImperativeHandle(ref, () => ({
    handleCaptureAndSend,
  }));

  return (
    <>
      <Webcam
        audio={false}
        height={props.height || 720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={props.width || 1280}
        videoConstraints={videoConstraints}
      />
      {/* The button is optional depending on whether you want internal or external control */}
      {/* <button onClick={capture}>Capture photo</button> */}
    </>
  );
});

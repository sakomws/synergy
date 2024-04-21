export async function fetchHumeJobPredictions(jobId: string, apiKey: string, state: string) {
  const url = `https://api.hume.ai/v0/batch/jobs/${jobId}/predictions`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Hume-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const hasPredictions =
      (data[0]?.results?.predictions &&
        data[0]?.results?.predictions.length &&
        data[0]?.results?.predictions[0].models.face.grouped_predictions &&
        data[0]?.results?.predictions[0].models.face.grouped_predictions.length &&
        data[0]?.results?.predictions[0].models.face.grouped_predictions[0].predictions) ||
      false;
    if (hasPredictions) data[0].state = state;

    console.log("here", data[0]);
    return hasPredictions ? data[0] : null; // Returning the data for further processing if needed
  } catch (error) {
    console.error("Failed to fetch job predictions:", error);
    return null; // Returning null or you might want to throw the error
  }
}

import React, { useState } from "react";
import {
  getAllJobIdsAndStatesFromLocalStorage,
  resetJobIdsInLocalStorage,
} from "../scripts/jobIdsLocalStorage";
import { fetchHumeJobPredictions } from "../scripts/fetchHumeJobPredictions";
import { JobsTable } from "../components/JobsTable";

export const Report = () => {
  const [predictions, setPredictions] = useState([]);

  async function getJobDetails() {
    const jobIds = getAllJobIdsAndStatesFromLocalStorage();
    console.log("jobIds", jobIds);
    const apiKey = import.meta.env.VITE_HUME_API_KEY; // Make sure to securely manage your API keys!

    const predictionPromises = jobIds.map((job) =>
      fetchHumeJobPredictions(job.jobId.job_id, apiKey, job.state)
    );

    try {
      const results = await Promise.all(predictionPromises);
      console.log("Predictions for all jobs:", results);
      setPredictions(transformData(results.filter((result) => result != null))); // Store only successful results
    } catch (error) {
      console.error("Error fetching predictions for all jobs:", error);
    }
  }

  function transformData(data) {
    return data.map((item) => {
      console.log("transformData", item);
      const jobId = item.source.filename; // assuming filename is used as jobId
      const state = item.state; // Example state, adjust based on actual data or additional logic
      const emotions =
        item?.results?.predictions &&
        item?.results?.predictions.length &&
        item?.results?.predictions[0].models.face.grouped_predictions &&
        item?.results?.predictions[0].models.face.grouped_predictions.length &&
        item?.results?.predictions[0].models.face.grouped_predictions[0].predictions
          ? item?.results?.predictions[0].models.face.grouped_predictions[0].predictions[0].emotions
          : null;

      // Reduce the emotions array into an object with emotion names as keys
      const emotionScores = (emotions || []).reduce((acc, emotion) => {
        acc[emotion.name] = emotion.score.toFixed(2);
        return acc;
      }, {});

      return {
        // jobId,
        state,
        ...emotionScores,
      };
    });
  }

  return (
    <div className="px-5">
      <button onClick={getJobDetails}>Get Report</button>
      <div>
        <button onClick={resetJobIdsInLocalStorage}>Clear History</button>
      </div>

      <JobsTable data={predictions} />
    </div>
  );
};

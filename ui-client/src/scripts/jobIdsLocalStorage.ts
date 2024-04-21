const jobIdsKey = "jobIds";

// Store a job ID along with its state in localStorage
export function storeJobIdAndStateInLocalStorage(jobId: string, state: string) {
  const storedJobIds = localStorage.getItem(jobIdsKey);
  const jobIds = storedJobIds ? JSON.parse(storedJobIds) : [];
  // Check if jobId already exists to update state instead of adding a new entry
  const existingIndex = jobIds.findIndex((item) => item.jobId === jobId);
  if (existingIndex !== -1) {
    jobIds[existingIndex].state = state; // Update state if already exists
  } else {
    jobIds.push({ jobId, state }); // Add new job ID with state
  }
  localStorage.setItem(jobIdsKey, JSON.stringify(jobIds));
}

// Retrieve all job IDs with their states from localStorage
export function getAllJobIdsAndStatesFromLocalStorage() {
  const storedJobIds = localStorage.getItem(jobIdsKey);
  return storedJobIds ? JSON.parse(storedJobIds) : [];
}

// Reset the job IDs in localStorage to an empty array
export function resetJobIdsInLocalStorage() {
  localStorage.setItem(jobIdsKey, JSON.stringify([]));
}

// Optionally, add a function to remove a specific jobId
export function removeJobIdFromLocalStorage(jobId: string) {
  const storedJobIds = localStorage.getItem(jobIdsKey);
  const jobIds = storedJobIds ? JSON.parse(storedJobIds) : [];
  const filteredJobIds = jobIds.filter((item) => item.jobId !== jobId);
  localStorage.setItem(jobIdsKey, JSON.stringify(filteredJobIds));
}

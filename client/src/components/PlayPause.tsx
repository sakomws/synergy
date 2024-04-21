import React from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"; // Ensure these are correctly imported

function PlayPause({ timerActive, onStartClick }) {
  return (
    <button
      onClick={onStartClick}
      className={`card-btn flex items-center justify-center space-x-2 ${
        timerActive ? "opacity-50" : ""
      }`}
    >
      {timerActive ? (
        <>
          <PauseIcon className="h-6 w-6 text-black-500" />
          <span>Pause</span>
        </>
      ) : (
        <>
          <PlayIcon className="h-6 w-6 text-black-500" />
          <span>Start</span>
        </>
      )}
    </button>
  );
}

export default PlayPause;

import React, { useState, useEffect, useRef } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

import ProgressCircle from "../components/ProgressCircle";
import FocusRating from "../components/FocusRating";
import PlayPause from "../components/PlayPause";
import useAudioPlayer from "./useAudioPlayer";
import chime from "../assets/bell.mp3";
import endSound from "../assets/level-up-191997.mp3";

import { WebCamCapture } from "../components/WebCamCapture";

import { SOUND_TYPE, STAGE } from "./constants";
import useWebcamCapture from "./useWebcamCapture";

export function Start() {
  // State to track remaining time in seconds
  const [sound, setSound] = useState(true);
  const audioPlayer = useAudioPlayer(chime, sound);
  const endAudioPlayer = useAudioPlayer(endSound, sound);

  const [currentStage, setCurrentStage] = useState(0); // Index of the current stage
  const [timeLeft, setTimeLeft] = useState(STAGE[0].time);
  const [timerActive, setTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focus, setFocus] = useState(0);
  const [showRateFocus, setShowRateFocus] = useState(false);

  const [task, setTask] = useState("");

  // -------- handle camera

  const webcamComponentRef = useRef(null);

  const triggerCaptureAndSend = (state: string) => {
    if (webcamComponentRef.current) {
      console.log("CAPTURE");
      webcamComponentRef.current.handleCaptureAndSend(state);
    }
  };

  // -------- handle camera end

  useEffect(() => {
    const MAX_TIME = STAGE[currentStage].time; // Define MAX_TIME based on the current stage's time
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        triggerCaptureAndSend(STAGE[currentStage].state);
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          setProgress((100 * (MAX_TIME - newTimeLeft)) / MAX_TIME); // Update progress based on new time left
          return newTimeLeft;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setProgress(100);

      // Since the play method returns a promise, handle it asynchronously
      if (STAGE[currentStage].sound) {
        const playPromise =
          STAGE[currentStage].sound == SOUND_TYPE.END ? audioPlayer.play() : endAudioPlayer.play();

        playPromise
          .then(() => {
            // This block runs after the audio finishes playing
            setTimeout(() => {
              const nextStage = (currentStage + 1) % STAGE.length;
              setCurrentStage(nextStage); // Update the current stage
              setTimeLeft(STAGE[nextStage].time); // Update time left based on the new stage
              setProgress(0); // Reset progress for the new stage
              if (nextStage == STAGE.length - 1) {
                setTimerActive(false);
              }
            }, 100); // A short delay to ensure the UI updates
          })
          .catch((error) => console.error("Error playing audio:", error));
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, currentStage, audioPlayer, endAudioPlayer]);

  const onStartClick = async () => {
    triggerCaptureAndSend("button click");

    // Check if the current stage is the last one
    if (currentStage === STAGE.length - 1) {
      try {
        // Optionally play a sound here if needed
        //await audioPlayer.play();
        // Reset to the first stage with all default settings
        setCurrentStage(0); // Reset to the first stage
        setTimeLeft(STAGE[0].time); // Reset time based on the first stage's time
        setTimerActive(false); // Optionally stop the timer or set to true based on your app's logic
        setProgress(0); // Reset progress
        setFocus(0); // Reset focus score
        // Reset any other state variables as needed
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      // If not the last stage, proceed as before
      if (!timerActive) {
        try {
          const nextStage = (currentStage + 1) % STAGE.length;
          setCurrentStage(nextStage);
          await (nextStage === 0 ? audioPlayer : endAudioPlayer).play(); // Choose the correct player based on the stage
          setTimerActive(true);
          setTimeLeft(STAGE[nextStage].time); // Update time for the next stage
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      } else {
        setTimerActive(false);
      }
    }
  };

  // Convert seconds into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const onToggleSound = () => {
    setSound(!sound);
  };

  useEffect(() => {
    if (STAGE[currentStage].getFeedback) {
      setShowRateFocus(true);
    } else {
      setShowRateFocus(false);
    }
  }, [currentStage, setShowRateFocus]);

  const onRateFocusClose = () => {
    setShowRateFocus(false);
  };

  const TASKS = [
    "Build Timer",
    "Send Hume data to backend",
    "Store data in MongoDB",
    "Create business presentation",
  ];

  const getTask = () => {
    const newTask = TASKS[Math.floor(Math.random() * 4)];
    console.log(newTask);
    setTask(newTask);
  };

  return (
    <div className="px-5">
      <div className="flex justify-end">
        <div className={`position absolute z-10 top-10`}>
          <FocusRating isVisible={showRateFocus} onClose={onRateFocusClose}></FocusRating>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 h-screen text-center">
        <h1 className="text-2xl">{STAGE[currentStage].title}</h1>
        <p>{STAGE[currentStage].description}</p>
        <WebCamCapture ref={webcamComponentRef} height={80} width={160} />
        <button onClick={() => triggerCaptureAndSend("self capture")}>Capture Photo</button>
        <div
          className="relative flex items-center justify-center"
          style={{ width: "160px", height: "210px" }}
        >
          <ProgressCircle progress={progress} />
          <div className="absolute bottom-0">{focus > 0 && <span>Focus {focus}%</span>}</div>
          <div className="absolute">
            <img src={STAGE[currentStage].image} alt="start" className="w-40 h-40" />
          </div>
        </div>
        <div>
          <button onClick={onToggleSound}>
            {sound ? (
              <SpeakerWaveIcon className="h-6 w-6 text-black-500" />
            ) : (
              <SpeakerXMarkIcon className="h-6 w-6 text-black-500" />
            )}
          </button>
          <p className="text-8xl">{formatTime(timeLeft)}</p>
          <div className="flex items-center justify-center">
            <PlayPause timerActive={timerActive} onStartClick={onStartClick} />
          </div>
          <div className="flex items-center justify-center">
            <button onClick={getTask}>Fetch Task</button>
          </div>
          <div>{task && <div>{task}</div>}</div>
        </div>
      </div>
    </div>
  );
}

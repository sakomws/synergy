import { useRef, useEffect, useState } from "react";

function useAudioPlayer(audioSrc, sound) {
  const audioRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize or update the audio element when audioSrc changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    } else {
      audioRef.current.src = audioSrc;
    }
    setIsInitialized(true);

    return () => {
      audioRef.current.pause();
      audioRef.current.src = ""; // Cleanup on unmount or source change
    };
  }, [audioSrc]);

  useEffect(() => {
    // Pause the audio if sound is disabled while audio is playing
    if (!sound && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [sound]);

  const play = () => {
    return new Promise((resolve, reject) => {
      if (!sound || !isInitialized) {
        console.log("Sound setting is off or audio not initialized, not playing.");
        return resolve();
      }

      audioRef.current
        .play()
        .then(() => {
          console.log("Audio playback started");
          audioRef.current.addEventListener("ended", resolve, { once: true });
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          reject(error);
        });
    });
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  return { play, pause };
}

export default useAudioPlayer;

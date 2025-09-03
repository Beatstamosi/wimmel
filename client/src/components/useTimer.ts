import { useEffect, useState, useCallback } from "react";

function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  return { start, stop, minutes, seconds };
}

export default useTimer;

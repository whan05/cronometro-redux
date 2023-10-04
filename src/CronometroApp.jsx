import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTimer,
  selectElapsedTime,
  selectIsRunning,
  startTimer,
  stopTimer,
  tick,
} from "./store/slices/cronometroSlice";

export const Timer = () => {
  const dispatch = useDispatch();
  const elapsedTime = useSelector(selectElapsedTime);
  const isRunning = useSelector(selectIsRunning);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
        updateTimer(elapsedTime);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, dispatch, elapsedTime]);

  const updateTimer = (totalMilliseconds) => {
    const hours = Math.floor(totalMilliseconds / 360000);
    const minutes = Math.floor((totalMilliseconds % 360000) / 6000);
    const seconds = Math.floor((totalMilliseconds % 6000) / 100);
    const milliseconds = totalMilliseconds % 100;

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setMilliseconds(milliseconds);
  };

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setMilliseconds(0)
  };

  return (
    <>
      <h1 className="text-center">Cronometro</h1>
      <hr />
      <h3 className="text-center my-5">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}.
        {String(milliseconds).padStart(2, "0")}
      </h3>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col">
            <button onClick={handleStart} className="btn btn-primary">
              {elapsedTime > 0  && isRunning ===  false ? "Continue" : 'Start'}
            </button>
          </div>
          <div className="col">
            <button onClick={handleStop} className="btn btn-danger">
              Stop
            </button>
          </div>
          <div className="col">
            <button onClick={handleReset} className="btn btn-success">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    isRunning: false,
    elapsedTime: 0,
  },
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.elapsedTime = 0;
      state.isRunning = false;
    },
    tick: (state) => {
      state.elapsedTime += 1;
    },
  },
});

export const { startTimer, stopTimer, resetTimer, tick } = timerSlice.actions;
export const selectElapsedTime = (state) => state.timer.elapsedTime;
export const selectIsRunning = (state) => state.timer.isRunning;


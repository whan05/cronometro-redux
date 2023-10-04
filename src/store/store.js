import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./slices/cronometroSlice";

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
  },
});

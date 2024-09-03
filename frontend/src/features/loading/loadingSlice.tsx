import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  [key: string]: boolean;
}

const initialState: LoadingState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    stopLoading: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

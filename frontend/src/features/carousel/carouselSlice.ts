import { createSlice } from "@reduxjs/toolkit";
import { getAllCarouselItems } from "./carouselActions";
import CarouselItem from "../../types/CarouselItem";

interface CarouselState {
  items: CarouselItem[] | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: CarouselState = {
  items: null,
  loading: false,
  error: undefined,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    // Your other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarouselItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCarouselItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllCarouselItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carouselSlice.reducer;

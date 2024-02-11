import { createSlice } from "@reduxjs/toolkit";
import { getAllCarouselItems, PostCarouselItem } from "./carouselActions";
import CarouselItem from "../../types/CarouselItem";

interface CarouselState {
  carouselItems: CarouselItem[];
  loading: boolean;
  error: string | undefined;
}

const initialState: CarouselState = {
  carouselItems: [],
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
        state.carouselItems = action.payload;
      })
      .addCase(getAllCarouselItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(PostCarouselItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = [action.payload, ...state.carouselItems!];
      })
      .addCase(PostCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer } = carouselSlice;
export default carouselSlice.reducer;

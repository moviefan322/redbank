import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCarouselItems,
  postCarouselItem,
  deleteCarouselItem,
  updateCarouselItem
} from "./carouselActions";
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
      .addCase(postCarouselItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = [action.payload, ...state.carouselItems!];
      })
      .addCase(postCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCarouselItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = state.carouselItems.filter(
          (item) => item._id !== action.payload.item._id
        );
      })
      .addCase(deleteCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCarouselItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = state.carouselItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer } = carouselSlice;
export default carouselSlice.reducer;

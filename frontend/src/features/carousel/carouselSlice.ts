import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCarouselItems,
  postCarouselItem,
  deleteCarouselItem,
  updateCarouselItem,
} from "./carouselActions";
import CarouselItem from "../../types/CarouselItem";

interface CarouselState {
  carouselItems: CarouselItem[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: CarouselState = {
  carouselItems: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarouselItems.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllCarouselItems.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = action.payload;
        state.success = true;
      })
      .addCase(getAllCarouselItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postCarouselItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = [action.payload, ...state.carouselItems!];
        state.success = true;
      })
      .addCase(postCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteCarouselItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselItems = state.carouselItems.filter(
          (item) => item._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateCarouselItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCarouselItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateCarouselItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = carouselSlice.actions;
export const { reducer } = carouselSlice;
export default carouselSlice.reducer;

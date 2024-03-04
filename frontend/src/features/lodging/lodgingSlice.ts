import { createSlice } from "@reduxjs/toolkit";
import {
  getAllLodging,
  postLodging,
  updateLodging,
  deleteLodging,
} from "./lodgingActions";
import Lodging from "../../types/Lodging";

interface LodgingState {
  lodging: Lodging[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: LodgingState = {
  lodging: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const lodgingSlice = createSlice({
  name: "lodging",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.updateSuccess = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLodging.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllLodging.fulfilled, (state, action) => {
        state.loading = false;
        state.lodging = action.payload;
        state.success = true;
      })
      .addCase(getAllLodging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postLodging.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postLodging.fulfilled, (state, action) => {
        state.loading = false;
        state.lodging = [action.payload, ...state.lodging!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postLodging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateLodging.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateLodging.fulfilled, (state, action) => {
        state.loading = false;
        state.lodging = state.lodging!.map((lodging) =>
          lodging._id === action.payload._id ? action.payload : lodging
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateLodging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteLodging.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteLodging.fulfilled, (state, action) => {
        state.loading = false;
        state.lodging = state.lodging!.filter(
          (lodging) => lodging._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteLodging.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = lodgingSlice.actions;
export default lodgingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBusinesses,
  postBusiness,
  updateBusiness,
  deleteBusiness,
} from "./businessActions";
import Business from "../../types/Business";

interface BusinessState {
  businesses: Business[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const businessSlice = createSlice({
  name: "businesses",
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
      .addCase(getAllBusinesses.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload;
        state.success = true;
      })
      .addCase(getAllBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postBusiness.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = [action.payload, ...state.businesses!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateBusiness.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = state.businesses!.map((business) =>
          business._id === action.payload._id ? action.payload : business
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteBusiness.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = state.businesses!.filter(
          (business) => business._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = businessSlice.actions;
export default businessSlice.reducer;

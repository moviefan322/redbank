import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGiftCards,
  postGiftCard,
  updateGiftCard,
  deleteGiftCard,
} from "./giftCardActions";
import GiftCard from "../../types/GiftCard";

interface GiftCardState {
  giftCards: GiftCard[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: GiftCardState = {
  giftCards: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const giftCardSlice = createSlice({
  name: "giftCards",
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
      .addCase(getAllGiftCards.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllGiftCards.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = action.payload;
        state.success = true;
      })
      .addCase(getAllGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postGiftCard.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = [action.payload, ...state.giftCards!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateGiftCard.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = state.giftCards!.map((giftCard) =>
          giftCard._id === action.payload._id ? action.payload : giftCard
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteGiftCard.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteGiftCard.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = state.giftCards!.filter(
          (giftCard) => giftCard._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = giftCardSlice.actions;
export default giftCardSlice.reducer;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import GiftCard from "../../types/GiftCard";
import PostGiftCardReq from "@/types/PostGiftCardReq";
import UpdateGiftCardReq from "@/types/UpdateGiftCardReq";
import { RootState } from "../../store/configureStore";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getAllGiftCards = createAsyncThunk<
  GiftCard[],
  void,
  { rejectValue: string }
>("giftCards/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/giftCards`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postGiftCard = createAsyncThunk<
  GiftCard,
  PostGiftCardReq,
  { rejectValue: string; state: RootState }
>("giftCards/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${backendUrl}/api/giftCards`, data, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateGiftCard = createAsyncThunk<
  GiftCard,
  UpdateGiftCardReq,
  { rejectValue: string; state: RootState }
>("giftCards/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/giftCards/${data._id}`,
      data,
      config
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const deleteGiftCard = createAsyncThunk<
  { message: string; item: GiftCard },
  string,
  { rejectValue: string; state: RootState }
>("giftCards/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/giftCards/${itemId}`,
      config
    );
    return response.data; // Assuming server responds with { message: "Carousel Item Removed" }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

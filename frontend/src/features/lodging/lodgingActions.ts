import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Lodging from "@/types/Lodging";
import PostLodgingReq from "../../types/PostLodgingReq";
import UpdateLodgingReq from "../../types/UpdateLodgingReq";
import { RootState } from "../../store/configureStore";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getAllLodging = createAsyncThunk<
  Lodging[],
  void,
  { rejectValue: string }
>("lodging/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/lodging`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postLodging = createAsyncThunk<
  Lodging,
  PostLodgingReq,
  { rejectValue: string; state: RootState }
>("lodging/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${backendUrl}/api/lodging`, data, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateLodging = createAsyncThunk<
  Lodging,
  UpdateLodgingReq,
  { rejectValue: string; state: RootState }
>("lodging/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/lodging/${data._id}`,
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

export const deleteLodging = createAsyncThunk<
  { message: string; item: Lodging },
  string,
  { rejectValue: string; state: RootState }
>("lodging/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/lodging/${itemId}`,
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

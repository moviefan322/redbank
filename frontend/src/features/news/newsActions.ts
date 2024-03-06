import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import News from "../../types/News";
import PostNewsReq from "@/types/PostNewsReq";
import UpdateNewsReq from "@/types/UpdateNewsReq";
import { RootState } from "../../store/configureStore";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getAllNews = createAsyncThunk<
  News[],
  void,
  { rejectValue: string }
>("news/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/news`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postNews = createAsyncThunk<
  News,
  PostNewsReq,
  { rejectValue: string; state: RootState }
>("news/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${backendUrl}/api/news`, data, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateNews = createAsyncThunk<
  News,
  UpdateNewsReq,
  { rejectValue: string; state: RootState }
>("news/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/news/${data._id}`,
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

export const deleteNews = createAsyncThunk<
  { message: string; item: News },
  string,
  { rejectValue: string; state: RootState }
>("news/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/news/${itemId}`,
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

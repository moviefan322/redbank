import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Event from "../../types/Event";
import PostEventReq from "../../types/PostEventReq";
// import UpdateCarouselItemReq from "@/types/UpdateCarouselItemReq";
import { RootState } from "../../store/configureStore";

let backendUrl: string;
if (process.env.NODE_ENV === "development") {
  backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
} else {
  backendUrl = "";
}
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllEvents = createAsyncThunk<
  Event[],
  void,
  { rejectValue: string }
>("events/getAll", async (_, { rejectWithValue }) => {
  try {
    console.log("fetching");
    const response = await axios.get(`${backendUrl}/api/events`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postEvent = createAsyncThunk<
  Event,
  PostEventReq,
  { rejectValue: string; state: RootState }
>("events/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${backendUrl}/api/events`,
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
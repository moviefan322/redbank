import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Newsletter from "../../types/Newsletter";
import UpdateNewsletterReq from "@/types/UpdateNewsletterReq";
import { RootState } from "../../store/configureStore";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getAllNewsletters = createAsyncThunk<
  Newsletter[],
  void,
  { rejectValue: string }
>("newsletter/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/newsletter`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateNewsletter = createAsyncThunk<
  Newsletter,
  UpdateNewsletterReq,
  { rejectValue: string; state: RootState }
>("newsletter/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/newsletter/${data._id}`,
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

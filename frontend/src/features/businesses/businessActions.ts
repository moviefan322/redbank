import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Business from "../../types/Business";
import PostBusinessReq from "../../types/PostBusinessReq";
import UpdateBusinessReq from "../../types/UpdateBusinessReq";
import { RootState } from "../../store/configureStore";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getAllBusinesses = createAsyncThunk<
  Business[],
  void,
  { rejectValue: string }
>("businesses/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/businesses`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postBusiness = createAsyncThunk<
  Business,
  PostBusinessReq,
  { rejectValue: string; state: RootState }
>("businesses/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${backendUrl}/api/businesses`, data, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateBusiness = createAsyncThunk<
  Business,
  UpdateBusinessReq,
  { rejectValue: string; state: RootState }
>("businesses/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/businesses/${data._id}`,
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

export const deleteBusiness = createAsyncThunk<
  { message: string; item: Business },
  string,
  { rejectValue: string; state: RootState }
>("businesses/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/businesses/${itemId}`,
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

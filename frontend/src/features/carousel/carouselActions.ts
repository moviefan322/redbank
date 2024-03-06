import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CarouselItem from "../../types/CarouselItem";
import PostCarouselItemReq from "@/types/PostCarouselItemReq";
import { RootState } from "@/store/configureStore";
import UpdateCarouselItemReq from "@/types/UpdateCarouselItemReq";

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllCarouselItems = createAsyncThunk<
  CarouselItem[],
  void,
  { rejectValue: string }
>("carouselItems/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/carouselItems`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postCarouselItem = createAsyncThunk<
  CarouselItem,
  PostCarouselItemReq,
  { rejectValue: string; state: RootState }
>("carouselItems/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${backendUrl}/api/carouselItems`,
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

export const updateCarouselItem = createAsyncThunk<
  CarouselItem,
  UpdateCarouselItemReq,
  { rejectValue: string; state: RootState }
>("carouselItems/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/carouselItems/${data._id}`,
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

export const deleteCarouselItem = createAsyncThunk<
  { message: string; item: CarouselItem }, // Expected success response type
  string, // Type of the argument (itemId in this case)
  { rejectValue: string; state: RootState } // Types for ThunkAPI
>("carouselItems/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token; // Get token from state

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/carouselItems/${itemId}`,
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

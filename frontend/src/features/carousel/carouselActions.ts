import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CarouselItem from "../../types/CarouselItem";

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

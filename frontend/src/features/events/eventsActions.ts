import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Event from "../../types/Event";
// import PostEventItemReq from "@/types/PostEventItemReq";
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

export const getAllCarouselItems = createAsyncThunk<
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
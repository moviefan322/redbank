import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Newsletter from "../../types/Newsletter";
// import PostNewsletterReq from "@/types/PostNewsletterReq";
// import UpdateNewsletterReq from "@/types/UpdateNewsletterReq";
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

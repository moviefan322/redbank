import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import LoginData from "../../types/LoginData";
import LoginRes from "../../types/LoginRes";


const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = createAsyncThunk<LoginRes, LoginData>(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/auth`,
        { username, password },
        config
      );

      const { data } = response;

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

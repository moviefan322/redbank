import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import BoardMember from "@/types/BoardMember";
import PostBoardMemberReq from "@/types/PostBoardMemberReq";
import UpdateBoardMemberReq from "@/types/UpdateBoardMemberReq";
import { RootState } from "../../store/configureStore";

let backendUrl: string;
if (process.env.NODE_ENV === "development") {
  backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
} else {
  backendUrl = "";
}

export const getAllBoardMembers = createAsyncThunk<
  BoardMember[],
  void,
  { rejectValue: string }
>("boardMembers/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/boardMembers`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const postBoardMember = createAsyncThunk<
  BoardMember,
  PostBoardMemberReq,
  { rejectValue: string; state: RootState }
>("boardMembers/post", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${backendUrl}/api/boardMembers`, data, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
});

export const updateBoardMember = createAsyncThunk<
  BoardMember,
  UpdateBoardMemberReq,
  { rejectValue: string; state: RootState }
>("boardMembers/update", async (data, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${backendUrl}/api/boardMembers/${data._id}`,
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

export const deleteBoardMember = createAsyncThunk<
  { message: string; item: BoardMember },
  string,
  { rejectValue: string; state: RootState }
>("boardMembers/delete", async (itemId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${backendUrl}/api/boardMembers/${itemId}`,
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

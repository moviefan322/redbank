import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNews,
  postNews,
  updateNews,
  deleteNews,
} from "./newsActions";
import News from "../../types/News";

interface NewsState {
  news: News[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.updateSuccess = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
        state.success = true;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postNews.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = [action.payload, ...state.news!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = state.news!.map((news) =>
          news._id === action.payload._id ? action.payload : news
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = state.news!.filter(
          (news) => news._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = newsSlice.actions;
export default newsSlice.reducer;

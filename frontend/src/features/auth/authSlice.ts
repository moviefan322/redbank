import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./authActions";
import AuthState from "../../types/AuthState";

let token;
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("admintoken") ?? null;
}

const initialState: AuthState = {
  loading: false,
  username: null,
  token,
  error: null,
  success: false,
  isLoggedIn: false,
  isNewData: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.username = null;
      state.token = null;
      state.error = null;
      state.isNewData = true;
    },
    setCredentials: (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.username = payload.username;
        state.isLoggedIn = true;
      }
    },
    setNewData: (state, { payload }) => {
      state.isNewData = payload;
    },
    isToken: (state) => {
      if (state.token) {
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.username = payload.username;
        state.token = payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("admintoken", payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export const { logout, setCredentials, setNewData, isToken } =
  authSlice.actions;
export default authSlice.reducer;

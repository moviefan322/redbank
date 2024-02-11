import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import carouselReducer from "@/features/carousel/carouselSlice";
import { authApi } from "@/services/auth/authService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    carousel: carouselReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

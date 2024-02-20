import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import carouselReducer from "@/features/carousel/carouselSlice";
import eventReducer from "@/features/events/eventSlice";
import newsReducer from "@/features/news/newsSlice";
import imageUploadReducer from "@/features/upload/uploadSlice";
import { authApi } from "@/services/auth/authService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    carousel: carouselReducer,
    imageUploader: imageUploadReducer,
    events: eventReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

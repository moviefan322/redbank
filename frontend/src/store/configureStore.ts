import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import carouselReducer from "@/features/carousel/carouselSlice";
import eventReducer from "@/features/events/eventSlice";
import newsReducer from "@/features/news/newsSlice";
import imageUploadReducer from "@/features/upload/uploadSlice";
import newsletterReducer from "@/features/newsletter/newsletterSlice";
import giftCardReducer from "@/features/giftCards/giftCardSlice";
import boardMemberReducer from "@/features/boardMembers/boardMemberSlice";
import businessReducer from "@/features/businesses/businessSlice";
import lodgingReducer from "@/features/lodging/lodgingSlice";
import loadingReducer from "@/features/loading/loadingSlice";
import pdfUploadReducer from "@/features/upload/pdfUploader";
import { authApi } from "@/services/auth/authService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    carousel: carouselReducer,
    imageUploader: imageUploadReducer,
    events: eventReducer,
    news: newsReducer,
    newsletters: newsletterReducer,
    giftCards: giftCardReducer,
    boardMembers: boardMemberReducer,
    businesses: businessReducer,
    lodging: lodgingReducer,
    loading: loadingReducer,
    pdfUploader: pdfUploadReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

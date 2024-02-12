// imageUploaderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { UploadImageForm } from "../../types/UploadImageForm";
import axios from "axios";

interface ImageUploaderState {
  uploading: boolean;
  imageUrl: string | null;
  error: string | null;
}

const initialState: ImageUploaderState = {
  uploading: false,
  imageUrl: null,
  error: null,
};

let backendUrl: string;
if (process.env.NODE_ENV === "development") {
  backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
} else {
  backendUrl = "";
}

export const uploadImage = createAsyncThunk<
  string,
  UploadImageForm,
  { rejectValue: string; state: RootState }
>(
  "imageUploader/uploadImage",
  async (formData, { rejectWithValue, getState }) => {
    console.log(formData);
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/upload`,
        formData,
        config
      );
      return response.data.imageUrl;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  }
);

export const imageUploaderSlice = createSlice({
  name: "imageUploader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectImageUrl = (state: RootState) =>
  state.imageUploader.imageUrl;
export const selectUploading = (state: RootState) =>
  state.imageUploader.uploading;
export const selectError = (state: RootState) => state.imageUploader.error;

export default imageUploaderSlice.reducer;

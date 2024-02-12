// imageUploaderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { UploadImageForm } from "../../types/UploadImageForm";

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

export const uploadImage = createAsyncThunk(
  "imageUploader/uploadImage",
  async (formData: UploadImageForm, thunkAPI) => {
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      return data.imageUrl;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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

// imageUploaderSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import axios from "axios";

interface ImageUploaderState {
  uploading: boolean;
  imageUrl: string | null;
  error: string | null;
  success: boolean;
}

const initialState: ImageUploaderState = {
  uploading: false,
  imageUrl: null,
  error: null,
  success: false,
};


  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;


export const uploadImage = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string; state: RootState }
>(
  "imageUploader/uploadImage",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.url;
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
  reducers: {
    resetUploadState: (state) => {
      state.uploading = false;
      state.imageUrl = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.imageUrl = action.payload;
        state.error = null; // Ensure error is cleared upon successful upload
        state.success = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUploadState } = imageUploaderSlice.actions;

export const selectImageUrl = (state: RootState) => state.imageUploader.imageUrl;
export const selectUploading = (state: any) => state.imageUploader.uploading;
export const selectError = (state: RootState) => state.imageUploader.error;

export default imageUploaderSlice.reducer;

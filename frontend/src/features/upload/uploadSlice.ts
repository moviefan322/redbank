// imageUploaderSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.uploading = false;
        state.imageUrl = action.payload;
        state.error = null; // Ensure error is cleared upon successful upload
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadState } = imageUploaderSlice.actions;

export const selectImageUrl = (state: any) => state.imageUploader.imageUrl;
export const selectUploading = (state: any) => state.imageUploader.uploading;
export const selectError = (state: any) => state.imageUploader.error;

export default imageUploaderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import axios from "axios";

interface PDFUploaderState {
  uploading: boolean;
  pdfUrl: string | null;
  error: string | null;
  success: boolean;
}

const initialState: PDFUploaderState = {
  uploading: false,
  pdfUrl: null,
  error: null,
  success: false,
};

const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

// Async thunk for uploading PDF
export const uploadPDF = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string; state: RootState }
>(
  "pdfUploader/uploadPDF",
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

export const pdfUploaderSlice = createSlice({
  name: "pdfUploader",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploading = false;
      state.pdfUrl = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPDF.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.uploading = false;
        state.pdfUrl = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUploadState } = pdfUploaderSlice.actions;

// Selectors
export const selectPDFUrl = (state: any) => state.pdfUploader.pdfUrl;
export const selectUploading = (state: any) => state.pdfUploader.uploading;
export const selectError = (state: any) => state.pdfUploader.error;

export default pdfUploaderSlice.reducer;

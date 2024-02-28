import { createSlice } from "@reduxjs/toolkit";
import { getAllNewsletters } from "./newsletterActions";
import Newsletter from "../../types/Newsletter";

interface NewsletterState {
  newsletter: Newsletter[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: NewsletterState = {
  newsletter: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const newsletterSlice = createSlice({
  name: "newsletter",
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
      .addCase(getAllNewsletters.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllNewsletters.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletter = action.payload;
        state.success = true;
      })
      .addCase(getAllNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
    // .addCase(updateNewsletter.pending, (state) => {
    //   state.loading = true;
    //   state.success = false;
    // })
    // .addCase(updateNewsletter.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.newsletter = state.newsletter!.map((newsletter) =>
    //     newsletter._id === action.payload._id ? action.payload : newsletter
    //   );
    //   state.success = true;
    //   state.updateSuccess = true;
    // })
    // .addCase(updateNewsletter.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.success = false;
    // })
  },
});

export const { resetSuccess, setLoading } = newsletterSlice.actions;
export default newsletterSlice.reducer;

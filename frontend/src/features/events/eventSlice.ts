import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getEvent,
  postEvent,
  updateEvent,
  deleteEvent,
  updateTiers,
} from "./eventActions";
import Event from "../../types/Event";

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const eventSlice = createSlice({
  name: "events",
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
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.success = true;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [action.payload];
        state.success = true;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postEvent.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [action.payload, ...state.events!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events!.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events!.filter(
          (event) => event._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateTiers.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateTiers.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events!.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = eventSlice.actions;
export default eventSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBoardMembers,
  postBoardMember,
  updateBoardMember,
  deleteBoardMember,
} from "./boardMemberActions";
import BoardMember from "../../types/BoardMember";

interface BoardMemberState {
  boardMembers: BoardMember[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
  updateSuccess: boolean;
}

const initialState: BoardMemberState = {
  boardMembers: [],
  loading: false,
  error: undefined,
  success: false,
  updateSuccess: false,
};

const boardMemberSlice = createSlice({
  name: "boardMembers",
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
      .addCase(getAllBoardMembers.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllBoardMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.boardMembers = action.payload;
        state.success = true;
      })
      .addCase(getAllBoardMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(postBoardMember.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(postBoardMember.fulfilled, (state, action) => {
        state.loading = false;
        state.boardMembers = [action.payload, ...state.boardMembers!];
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(postBoardMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateBoardMember.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateBoardMember.fulfilled, (state, action) => {
        state.loading = false;
        state.boardMembers = state.boardMembers!.map((boardMember) =>
          boardMember._id === action.payload._id ? action.payload : boardMember
        );
        state.success = true;
        state.updateSuccess = true;
      })
      .addCase(updateBoardMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteBoardMember.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteBoardMember.fulfilled, (state, action) => {
        state.loading = false;
        state.boardMembers = state.boardMembers!.filter(
          (boardMember) => boardMember._id !== action.payload.item._id
        );
        state.success = true;
      })
      .addCase(deleteBoardMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, setLoading } = boardMemberSlice.actions;
export default boardMemberSlice.reducer;

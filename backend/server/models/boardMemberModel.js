import mongoose from "mongoose";

const BoardMemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: true,
    },
    officerOrDirector: {
      type: String,
      required: true,
      enum: ["Officer", "Director"],
    },
    executiveCommitteeMember: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BoardMember = mongoose.model("BoardMember", BoardMemberSchema);

export default BoardMember;

import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
      unique: false, // Note: Corrected typo from "unqiue" to "unique"
    },
    urlPhoto: {
      type: String,
      required: true,
    },
    link: {
      type: String, // Consider if this should also have `default: ''` if it's optional but you want to avoid `null`
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;

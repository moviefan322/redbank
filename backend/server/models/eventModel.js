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
      unique: false,
    },
    urlPhoto: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    descriptionShort: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;

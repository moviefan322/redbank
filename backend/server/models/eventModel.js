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
    startTime: {
      type: String,
      required: false,
    },
    endTime: {
      type: String,
      required: false,
    },
    allDay: {
      type: Boolean,
      required: true,
    },
    urlPhoto: {
      type: String,
      required: true,
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

EventSchema.index({
  title: "text",
  description: "text",
  descriptionShort: "text",
});

const Event = mongoose.model("Event", EventSchema);

export default Event;

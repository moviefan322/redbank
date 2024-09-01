import mongoose from "mongoose";

const SponsorSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

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
    endDate: {
      type: String,
      required: false,
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
    tiers: [
      {
        name: String,
        sponsors: [SponsorSchema],
      },
    ],
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

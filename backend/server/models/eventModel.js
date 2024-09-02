import mongoose from "mongoose";

const ImageSpecsSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  height: {
    type: Number,
    required: [true, "Height is required"],
    min: [50, "Height must be at least 50px"],
    max: [350, "Height must be no more than 350px"],
  },
  width: {
    type: Number,
    required: [true, "Width is required"],
    min: [50, "Width must be at least 50px"],
    max: [350, "Width must be no more than 350px"],
  },
  borderRadius: {
    type: Number,
    required: [true, "Border radius is required"],
    min: [0, "Border radius must be at least 0%"],
    max: [100, "Border radius must be no more than 100%"],
  },
});

const SponsorSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: ImageSpecsSchema,
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

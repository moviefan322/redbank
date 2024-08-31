import mongoose from "mongoose";

const sponsorSchema = mongoose.Schema(
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
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SponsorItem = mongoose.model("SponsorItem", sponsorSchema);

export default SponsorItem;

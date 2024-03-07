import mongoose from "mongoose";

const BusinessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.index({ name: "text", website: "text" });

const Business = mongoose.model("Business", BusinessSchema);

export default Business;

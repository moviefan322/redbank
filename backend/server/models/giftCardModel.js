import mongoose from "mongoose";

const GiftCardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const GiftCard = mongoose.model("GiftCard", GiftCardSchema);

export default GiftCard;
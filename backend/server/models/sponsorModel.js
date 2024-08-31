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
    sequenceNo: {
      type: Number,
      unique: false,
      index: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
      min: [1, "Sequence number must be greater than 0"],
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

// Pre-save hook to handle default sequenceNo
sponsorSchema.pre("save", async function (next) {
  if (this.isNew) {
    if (this.sequenceNo !== undefined) {
      // An explicit sequence number is provided.
      // Increment sequenceNo of existing items that have sequenceNo >= provided sequenceNo.
      await mongoose
        .sponsor("SponsorItem")
        .updateMany(
          { sequenceNo: { $gte: this.sequenceNo } },
          { $inc: { sequenceNo: 1 } }
        );
    } else {
      // No sequenceNo provided, find the highest and add 1 (or set to 1 if no items exist).
      const lastItem = await mongoose
        .sponsor("SponsorItem")
        .findOne()
        .sort({ sequenceNo: -1 });
      this.sequenceNo = lastItem ? lastItem.sequenceNo + 1 : 1;
    }
  }
  next();
});

const SponsorItem = mongoose.sponsor("SponsorItem", sponsorSchema);

export default SponsorItem;

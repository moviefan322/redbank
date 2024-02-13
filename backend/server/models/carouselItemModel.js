import mongoose from "mongoose";

const carouselItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    linkText: {
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
    sequenceNo: {
      type: Number,
      unique: false,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
      min: [1, "Sequence number must be greater than 0"], // ensures the value is greater than 0
      // Removed the `required: true` to make it optional
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to handle default sequenceNo
carouselItemSchema.pre("save", async function (next) {
  if (this.isNew) {
    if (this.sequenceNo !== undefined) {
      // An explicit sequence number is provided.
      // Increment sequenceNo of existing items that have sequenceNo >= provided sequenceNo.
      await mongoose
        .model("CarouselItem")
        .updateMany(
          { sequenceNo: { $gte: this.sequenceNo } },
          { $inc: { sequenceNo: 1 } }
        );
    } else {
      // No sequenceNo provided, find the highest and add 1 (or set to 1 if no items exist).
      const lastItem = await mongoose
        .model("CarouselItem")
        .findOne()
        .sort({ sequenceNo: -1 });
      this.sequenceNo = lastItem ? lastItem.sequenceNo + 1 : 1;
    }
  }
  next();
});

const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);

export default CarouselItem;

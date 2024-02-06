import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const carouselItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
      unqiue: false,
    },
    urlPhoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

carouselItemSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

carouselItemSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);

export default CarouselItem;

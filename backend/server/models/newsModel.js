import mongoose from "mongoose";

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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

const News = mongoose.model("News", NewsSchema);

export default News;

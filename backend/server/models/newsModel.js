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
      required: false,
    },
    linkText: {
      type: String,
      required: false,
    },
    descriptionShort: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

NewsSchema.index({ title: "text", description: "text" });

const News = mongoose.model("News", NewsSchema);

export default News;

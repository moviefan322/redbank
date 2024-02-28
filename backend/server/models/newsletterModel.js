import mongoose from "mongoose";

const NewsletterSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
    },
    mailchimp_id: {
      type: String,
      required: true,
    },
    create_time: {
      type: String,
      required: true,
    },
    subject_line: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

export default Newsletter;

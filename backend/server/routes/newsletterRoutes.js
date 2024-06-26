import express from "express";
const router = express.Router();
import {
  getNewsletters,
  updateNewsletter,
  postToMailingList,
} from "../controllers/newsletterController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getNewsletters);

router.route("/:_id").put(protect, updateNewsletter);

router.route("/add").post(postToMailingList);

export default router;

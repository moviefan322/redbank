import express from "express";
const router = express.Router();
import {
  getNewsletters,
  updateNewsletter,
} from "../controllers/newsletterController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getNewsletters);

router.route("/:_id").put(protect, updateNewsletter);

export default router;

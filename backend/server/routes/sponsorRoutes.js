import express from "express";
const router = express.Router();
import {
  getSponsors,
  getSponsorById,
  deleteSponsor,
  createSponsor,
  updateSponsor,
} from "../controllers/sponsorController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getSponsors).post(protect, createSponsor);
router
  .route("/:_id")
  .get(getSponsorById)
  .put(protect, updateSponsor)
  .delete(protect, deleteSponsor);

export default router;

import express from "express";
const router = express.Router();
import {
  getAllLodging,
  getLodgingById,
  deleteLodging,
  createLodging,
  deleteAllLodging,
  updateLodging,
} from "../controllers/lodgingController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllLodging)
  .post(protect, createLodging)
  .delete(protect, deleteAllLodging);
router
  .route("/:_id")
  .get(getLodgingById)
  .put(protect, updateLodging)
  .delete(protect, deleteLodging);

export default router;

import express from "express";
const router = express.Router();
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getEvents).post(protect, createEvent);
router.route("/:_id").get(getEventById).delete(protect, deleteEvent);

export default router;

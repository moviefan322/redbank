import express from "express";
const router = express.Router();
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
  deleteAllEvents,
  updateTiers,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getEvents)
  .post(protect, createEvent)
  .delete(protect, deleteAllEvents);
router
  .route("/:_id")
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);
router.route("/:_id/tiers").put(protect, updateTiers);

export default router;

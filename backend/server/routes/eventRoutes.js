import express from "express";
const router = express.Router();
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getEvents).post(protect, createEvent);
router
  .route("/:_id")
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

export default router;

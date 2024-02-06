import express from "express";
const router = express.Router();
import {
  getCarouselItems,
  getCarouselItemById,
  deleteCarouselItem,
  createCarouselItem,
  updateCarouselItem,
} from "../controllers/carouselItemController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getCarouselItems).post(protect, createCarouselItem);
router
  .route("/:_id")
  .get(getCarouselItemById)
  .put(protect, updateCarouselItem)
  .delete(protect, deleteCarouselItem);

export default router;

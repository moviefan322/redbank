import express from "express";
const router = express.Router();
import {
  getAllGiftCards,
  getGiftCardById,
  deleteGiftCard,
  createGiftCard,
  deleteAllGiftCards,
  updateGiftCard,
} from "../controllers/giftCardController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllGiftCards)
  .post(protect, createGiftCard)
  .delete(protect, deleteAllGiftCards);
router
  .route("/:_id")
  .get(getGiftCardById)
  .put(protect, updateGiftCard)
  .delete(protect, deleteGiftCard);

export default router;

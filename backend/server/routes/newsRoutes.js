import express from "express";
const router = express.Router();
import {
  getNews,
  getNewsById,
  deleteNews,
  createNews,
  deleteAllNews,
  updateNews,
} from "../controllers/newsController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getNews)
  .post(protect, createNews)
  .delete(protect, deleteAllNews);
router
  .route("/:_id")
  .get(getNewsById)
  .put(protect, updateNews)
  .delete(protect, deleteNews);

export default router;

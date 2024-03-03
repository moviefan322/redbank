import express from "express";
const router = express.Router();
import {
  getAllBusinesses,
  getBusinessById,
  deleteBusiness,
  createBusiness,
  deleteAllBusinesses,
  updateBusiness,
} from "../controllers/businessController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllBusinesses)
  .post(protect, createBusiness)
  .delete(protect, deleteAllBusinesses);
router
  .route("/:_id")
  .get(getBusinessById)
  .put(protect, updateBusiness)
  .delete(protect, deleteBusiness);

export default router;

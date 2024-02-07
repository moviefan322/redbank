import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(registerUser)
  .get(protect, getUsers)
  .delete(protect, deleteAllUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

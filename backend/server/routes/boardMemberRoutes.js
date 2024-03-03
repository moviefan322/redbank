import express from "express";
const router = express.Router();
import {
  getAllBoardMembers,
  getBoardMemberById,
  deleteBoardMember,
  createBoardMember,
  deleteAllBoardMembers,
  updateBoardMember,
} from "../controllers/boardMemberController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllBoardMembers)
  .post(protect, createBoardMember)
  .delete(protect, deleteAllBoardMembers);
router
  .route("/:_id")
  .get(getBoardMemberById)
  .put(protect, updateBoardMember)
  .delete(protect, deleteBoardMember);

export default router;

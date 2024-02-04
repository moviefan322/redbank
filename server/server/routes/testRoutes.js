import express from "express";
const router = express.Router();
import {getTest} from "../controllers/testController.js";
// import {
//   authUser,
//   registerUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
// } from "../controllers/userController.js";

router.get("/", getTest);

export default router;

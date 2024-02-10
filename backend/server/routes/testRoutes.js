import express from "express";
const router = express.Router();
import {
  getTest,
  cookieCheck,
  cookieSet,
} from "../controllers/testController.js";

router.get("/", getTest);
router.get("/cookieSet", cookieSet);
router.get("/cookieCheck", cookieCheck);

export default router;

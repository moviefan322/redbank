import express from "express";
const router = express.Router();
import { getNewsletters } from "../controllers/newsletterController.js";

router.get("/", getNewsletters);

export default router;

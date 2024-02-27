import express from "express";
const router = express.Router();
import { getMailchimpData } from "../controllers/mailchimpController.js";

router.get("/", getMailchimpData);

export default router;

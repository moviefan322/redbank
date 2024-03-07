import express from "express";
const router = express.Router();
import { getSearchResults } from "../controllers/searchController.js";

router.get("/", getSearchResults);

export default router;

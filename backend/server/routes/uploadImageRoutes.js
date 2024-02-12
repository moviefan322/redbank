import express from "express";
const router = express.Router();
import multer from "multer";
import { uploadImage } from "../controllers/uploadImageController.js";

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

router.post("/", upload.single("file"), uploadImage);

export default router;

import express from "express";
const router = express.Router();
import multer from "multer";
import { uploadImage } from "../controllers/uploadImageController.js";
import { uploadPDF } from "../controllers/uploadPDFController.js";
import { protect } from "../middleware/authMiddleware.js";

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

router.post("/", protect, upload.single("file"), uploadImage);
router.post("/pdf", protect, upload.single("file"), uploadPDF);

export default router;

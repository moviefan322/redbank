import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 3000;
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import uploadImageRoutes from "./routes/uploadImageRoutes.js";
import carouselItemRoutes from "./routes/carouselItemRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import boardMemberRoutes from "./routes/boardMemberRoutes.js";
import giftCardRoutes from "./routes/giftCardRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import lodgingRoutes from "./routes/lodgingRoutes.js";

connectDB();

const app = express();

const corsOptions = {
  origin: `${process.env.FRONTEND_ORIGIN}`,
  credentials: true,
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/carouselItems", carouselItemRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/upload", uploadImageRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/boardMembers", boardMemberRoutes);
app.use("/api/giftCards", giftCardRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/lodging", lodgingRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

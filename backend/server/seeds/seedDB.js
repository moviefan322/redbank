import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import mongoose from "mongoose";
import BoardMember from "../models/boardMemberModel.js";
import { boardMembers } from "./boardMembers.js";

// MongoDB connection string

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seedDB = async () => {
  await BoardMember.deleteMany({});
  await BoardMember.insertMany(boardMembers);
  console.log("Database seeded with board members!");
};

seedDB().then(() => mongoose.connection.close());

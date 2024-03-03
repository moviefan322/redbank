import mongoose from "mongoose";
import connectDB from "../config/db.js";
import BoardMember from "../models/boardMemberModel.js";
import { boardMembers } from "./boardMembers.js";

// MongoDB connection string

connectDB();

const seedDB = async () => {
  await BoardMember.deleteMany({});
  await BoardMember.insertMany(boardMembers);
  console.log("Database seeded with board members!");
};

seedDB().then(() => mongoose.connection.close());

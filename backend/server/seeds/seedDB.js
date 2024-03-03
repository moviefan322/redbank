import mongoose from "mongoose";
import connectDB from "../config/db.js";
import BoardMember from "../models/boardMemberModel.js";
import GiftCard from "../models/giftCardModel.js";
import { boardMembers } from "./boardMembers.js";
import { giftCards } from "./giftCards.js";

// MongoDB connection string

connectDB();

const seedDB = async () => {
  await BoardMember.deleteMany({});
  await BoardMember.insertMany(boardMembers);
  await GiftCard.deleteMany({});
  await GiftCard.insertMany(giftCards);
  console.log("Database seeded with board members!");
};

seedDB().then(() => mongoose.connection.close());

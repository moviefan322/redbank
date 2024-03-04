import mongoose from "mongoose";
import connectDB from "../config/db.js";
import BoardMember from "../models/boardMemberModel.js";
import GiftCard from "../models/giftCardModel.js";
import Business from "../models/businessModel.js";
import Lodging from "../models/lodgingModel.js";
import { boardMembers } from "./boardMembers.js";
import { giftCards } from "./giftCards.js";
import { businesses } from "./businesses.js";
import { lodging } from "./lodging.js";

// MongoDB connection string

connectDB();

const seedDB = async () => {
  await BoardMember.deleteMany({});
  await BoardMember.insertMany(boardMembers);
  await GiftCard.deleteMany({});
  await GiftCard.insertMany(giftCards);
  await Business.deleteMany({});
  await Business.insertMany(businesses);
  await Lodging.deleteMany({});
  await Lodging.insertMany(lodging);
  console.log("Database seeded!");
};

seedDB().then(() => mongoose.connection.close());

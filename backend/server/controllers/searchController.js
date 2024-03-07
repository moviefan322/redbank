import asyncHandler from "express-async-handler";
import Business from "../models/businessModel.js";
import Event from "../models/eventModel.js";
import Lodging from "../models/lodgingModel.js";
import News from "../models/newsModel.js";

// @desc    get all search results
// @route   GET /api/search
// @access  Public

const getSearchResults = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query;
  const businesses = await Business.find({ $text: { $search: searchQuery } });
  const events = await Event.find({ $text: { $search: searchQuery } });
  const lodgings = await Lodging.find({ $text: { $search: searchQuery } });
  const news = await News.find({ $text: { $search: searchQuery } });

  res.json({ businesses, events, lodgings, news });
});

export { getSearchResults };

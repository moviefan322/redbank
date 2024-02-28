import asyncHandler from "express-async-handler";
import News from "../models/newsModel.js";

// @desc    get all news
// @route   GET /api/news
// @access  Public

const getNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort({ createdAt: -1 });
  res.json(news);
});

// @desc    get single news
// @route   GET /api/news/:_id
// @access  Public

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params._id);

  if (news) {
    res.json(news);
  } else {
    res.status(404);
    throw new Error(`News with id:${req.params._id} not found`);
  }
});

// @desc    delete a news
// @route   DELETE /api/news/:_id
// @access  Private/Admin

const deleteNews = asyncHandler(async (req, res) => {
  const deletedNews = await News.findByIdAndDelete(req.params._id);

  if (deletedNews) {
    res.json({ message: "News removed", item: deletedNews });
  } else {
    res.status(404);
    throw new Error("News not found");
  }
});

// @desc    create a news
// @route   POST /api/news
// @access  Private/Admin

const createNews = asyncHandler(async (req, res) => {
  const { title, urlPhoto, link, description, descriptionShort, videoLink } =
    req.body;

  const news = new News({
    title,
    urlPhoto,
    link,
    description,
    descriptionShort,
    videoLink,
  });

  const createdNews = await news.save();
  res.status(201).json(createdNews);
});

// @desc    update a news
// @route   PUT /api/news/:_id
// @access  Private/Admin

const updateNews = asyncHandler(async (req, res) => {
  const { title, urlPhoto, link, description, descriptionShort, videoLink } =
    req.body;

  const news = await News.findById(req.params._id);

  if (news) {
    if (title !== undefined) news.title = title;
    if (urlPhoto !== undefined) news.urlPhoto = urlPhoto;
    if (link !== undefined) news.link = link;
    if (description !== undefined) news.description = description;
    if (descriptionShort !== undefined)
      news.descriptionShort = descriptionShort;

    if (videoLink !== undefined) news.videoLink = videoLink;
    const updatedNews = await news.save();
    res.json(updatedNews);
  } else {
    res.status(404);
    throw new Error("News not found");
  }
});

const deleteAllNews = asyncHandler(async (req, res) => {
  const deletedNews = await News.deleteMany({});

  if (deletedNews) {
    res.json({ message: "News removed" });
  } else {
    res.status(404);
    throw new Error("News not found");
  }
});

export {
  getNews,
  getNewsById,
  deleteNews,
  createNews,
  updateNews,
  deleteAllNews,
};

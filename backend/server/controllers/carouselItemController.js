import asyncHandler from "express-async-handler";
import CarouselItem from "../models/carouselItemModel.js";

// @desc    get all carousel items
// @route   GET /api/carouselItem
// @access  Public

const getCarouselItems = asyncHandler(async (req, res) => {
  const carouselItems = await CarouselItem.find({});
  res.json(carouselItems);
});

// @desc    get single carousel item
// @route   GET /api/carouselItem/:id
// @access  Public

const getCarouselItemById = asyncHandler(async (req, res) => {
  const carouselItem = await CarouselItem.findById(req.params.id);

  if (carouselItem) {
    res.json(carouselItem);
  } else {
    res.status(404);
    throw new Error("Carousel Item not found");
  }
});

// @desc    delete a carousel item
// @route   DELETE /api/carouselItem/:id
// @access  Private/Admin

const deleteCarouselItem = asyncHandler(async (req, res) => {
  const carouselItem = await CarouselItem.findById(req.params.id);

  if (carouselItem) {
    await carouselItem.remove();
    res.json({ message: "Carousel Item removed" });
  } else {
    res.status(404);
    throw new Error("Carousel Item not found");
  }
});

// @desc    create a carousel item
// @route   POST /api/carouselItem
// @access  Private/Admin

const createCarouselItem = asyncHandler(async (req, res) => {
  const { title, linkText, urlPhoto, link } = req.body;
  const carouselItem = new CarouselItem({
    title,
    linkText,
    urlPhoto,
    link,
  });

  const createdCarouselItem = await carouselItem.save();
  res.status(201).json(createdCarouselItem);
});

// @desc    update a carousel item
// @route   PUT /api/carouselItem/:id
// @access  Private/Admin

const updateCarouselItem = asyncHandler(async (req, res) => {
  const { title, linkText, urlPhoto, link } = req.body;

  const carouselItem = await CarouselItem.findById(req.params.id);

  if (carouselItem) {
    if (title !== undefined) carouselItem.title = title;
    if (linkText !== undefined) carouselItem.linkText = linkText;
    if (urlPhoto !== undefined) carouselItem.urlPhoto = urlPhoto;
    if (link !== undefined) carouselItem.link = link;

    const updatedCarouselItem = await carouselItem.save();
    res.json(updatedCarouselItem);
  } else {
    res.status(404);
    throw new Error("Carousel Item not found");
  }
});

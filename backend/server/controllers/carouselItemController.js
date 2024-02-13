import asyncHandler from "express-async-handler";
import CarouselItem from "../models/carouselItemModel.js";

// @desc    get all carousel items
// @route   GET /api/carouselItem
// @access  Public

const getCarouselItems = asyncHandler(async (req, res) => {
  const carouselItems = await CarouselItem.find({}).sort({ sequenceNo: 1 });
  res.json(carouselItems);
});
// @desc    get single carousel item
// @route   GET /api/carouselItem/:_id
// @access  Public

const getCarouselItemById = asyncHandler(async (req, res) => {
  const carouselItem = await CarouselItem.findById(req.params._id);

  if (carouselItem) {
    res.json(carouselItem);
  } else {
    res.status(404);
    throw new Error(`Carousel Item with id:${req.params._id} not found`);
  }
});

// @desc    delete a carousel item
// @route   DELETE /api/carouselItem/:_id
// @access  Private/Admin

const deleteCarouselItem = asyncHandler(async (req, res) => {
  const deletedCarouselItem = await CarouselItem.findByIdAndDelete(
    req.params._id
  );

  if (deletedCarouselItem) {
    res.json({ message: "Carousel Item removed", item: deletedCarouselItem });
  } else {
    res.status(404);
    throw new Error("Carousel Item not found");
  }
});

// @desc    create a carousel item
// @route   POST /api/carouselItem
// @access  Private/Admin

const createCarouselItem = asyncHandler(async (req, res) => {
  const { title, linkText, urlPhoto, link, sequenceNo } = req.body;

  const carouselItem = new CarouselItem({
    title,
    linkText,
    urlPhoto,
    link,
    sequenceNo,
  });

  const createdCarouselItem = await carouselItem.save();
  res.status(201).json(createdCarouselItem);
});

// @desc    update a carousel item
// @route   PUT /api/carouselItem/:id
// @access  Private/Admin

const updateCarouselItem = asyncHandler(async (req, res) => {
  const {
    title,
    linkText,
    urlPhoto,
    link,
    sequenceNo: newSequenceNo,
  } = req.body;

  const carouselItem = await CarouselItem.findById(req.params._id);

  if (!carouselItem) {
    return res.status(404).json({ message: "Carousel Item not found" });
  }

  const currentSequenceNo = carouselItem.sequenceNo;

  // Only proceed if the sequenceNo is actually changing
  if (newSequenceNo !== undefined && newSequenceNo !== currentSequenceNo) {
    // Identify the range of sequence numbers that need to be adjusted
    const minSeqNo = Math.min(currentSequenceNo, newSequenceNo);
    const maxSeqNo = Math.max(currentSequenceNo, newSequenceNo);

    // Moving item down
    if (newSequenceNo > currentSequenceNo) {
      await CarouselItem.updateMany(
        { sequenceNo: { $gt: currentSequenceNo, $lte: newSequenceNo } },
        { $inc: { sequenceNo: -1 } }
      );
    }
    // Moving item up
    else {
      await CarouselItem.updateMany(
        { sequenceNo: { $gte: newSequenceNo, $lt: currentSequenceNo } },
        { $inc: { sequenceNo: 1 } }
      );
    }

    // Update the sequenceNo of the current item
    carouselItem.sequenceNo = newSequenceNo;
  }

  // Update other fields
  carouselItem.title = title ?? carouselItem.title;
  carouselItem.linkText = linkText ?? carouselItem.linkText;
  carouselItem.urlPhoto = urlPhoto ?? carouselItem.urlPhoto;
  carouselItem.link = link ?? carouselItem.link;

  await carouselItem.save();
  res.json(carouselItem);
});

export {
  getCarouselItems,
  getCarouselItemById,
  deleteCarouselItem,
  createCarouselItem,
  updateCarouselItem,
};

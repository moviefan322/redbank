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
    res.status(404);
    throw new Error("Carousel Item not found");
  }

  // Check if sequenceNo is being updated and is different from the current value
  if (
    newSequenceNo !== undefined &&
    newSequenceNo !== carouselItem.sequenceNo
  ) {
    // Adjust sequence numbers for other items
    // If the new sequence number is greater than the current, decrement sequenceNos in between
    if (newSequenceNo > carouselItem.sequenceNo) {
      await CarouselItem.updateMany(
        { sequenceNo: { $gt: carouselItem.sequenceNo, $lte: newSequenceNo } },
        { $inc: { sequenceNo: -1 } }
      );
    }
    // If the new sequence number is less than the current, increment sequenceNos in between
    else if (newSequenceNo < carouselItem.sequenceNo) {
      await CarouselItem.updateMany(
        { sequenceNo: { $lt: carouselItem.sequenceNo, $gte: newSequenceNo } },
        { $inc: { sequenceNo: 1 } }
      );
    }

    // Update the sequenceNo of the current item after adjusting others
    carouselItem.sequenceNo = newSequenceNo;
  }

  // Update other fields
  if (title !== undefined) carouselItem.title = title;
  if (linkText !== undefined) carouselItem.linkText = linkText;
  if (urlPhoto !== undefined) carouselItem.urlPhoto = urlPhoto;
  if (link !== undefined) carouselItem.link = link;

  const updatedCarouselItem = await carouselItem.save();
  res.json(updatedCarouselItem);
});

export {
  getCarouselItems,
  getCarouselItemById,
  deleteCarouselItem,
  createCarouselItem,
  updateCarouselItem,
};

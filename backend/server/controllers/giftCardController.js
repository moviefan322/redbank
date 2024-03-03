import asyncHandler from "express-async-handler";
import GiftCard from "../models/giftCardModel.js";

// @desc    get all giftCards
// @route   GET /api/giftCard
// @access  Public

const getAllGiftCards = asyncHandler(async (req, res) => {
  const giftCard = await GiftCard.find({});
  res.json(giftCard);
});

// @desc    get single giftCard
// @route   GET /api/giftCard/:_id
// @access  Public

const getGiftCardById = asyncHandler(async (req, res) => {
  const giftCard = await GiftCard.findById(req.params._id);

  if (giftCard) {
    res.json(giftCard);
  } else {
    res.status(404);
    throw new Error(`GiftCard with id:${req.params._id} not found`);
  }
});

// @desc    delete a giftCard
// @route   DELETE /api/giftCard/:_id
// @access  Private/Admin

const deleteGiftCard = asyncHandler(async (req, res) => {
  const deletedGiftCard = await GiftCard.findByIdAndDelete(req.params._id);

  if (deletedGiftCard) {
    res.json({ message: "GiftCard removed", item: deletedGiftCard });
  } else {
    res.status(404);
    throw new Error("GiftCard not found");
  }
});

// @desc    create a giftCard
// @route   POST /api/giftCard
// @access  Private/Admin

const createGiftCard = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const giftCard = new GiftCard({
    name,
  });

  const createdGiftCard = await giftCard.save();
  res.status(201).json(createdGiftCard);
});

// @desc    update a giftCard
// @route   PUT /api/giftCard/:_id
// @access  Private/Admin

const updateGiftCard = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const giftCard = await GiftCard.findById(req.params._id);

  if (giftCard) {
    giftCard.name = name;

    const updatedGiftCard = await giftCard.save();
    res.json(updatedGiftCard);
  } else {
    res.status(404);
    throw new Error("GiftCard not found");
  }
});

const deleteAllGiftCards = asyncHandler(async (req, res) => {
  const deletedGiftCards = await GiftCard.deleteMany({});

  if (deletedGiftCards) {
    res.json({ message: "GiftCards removed" });
  } else {
    res.status(404);
    throw new Error("GiftCard not found");
  }
});

export {
  getAllGiftCards,
  getGiftCardById,
  deleteGiftCard,
  createGiftCard,
  updateGiftCard,
  deleteAllGiftCards,
};

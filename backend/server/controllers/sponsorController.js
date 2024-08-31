import asyncHandler from "express-async-handler";
import Sponsor from "../models/sponsorModel.js";

// @desc    get all sponsor items
// @route   GET /api/sponsor
// @access  Public

const getSponsors = asyncHandler(async (req, res) => {
  const sponsors = await Sponsor.find({}).sort({ sequenceNo: 1 });
  res.json(sponsors);
});
// @desc    get single sponsor item
// @route   GET /api/sponsor/:_id
// @access  Public

const getSponsorById = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params._id);

  if (sponsor) {
    res.json(sponsor);
  } else {
    res.status(404);
    throw new Error(`Sponsor Item with id:${req.params._id} not found`);
  }
});

// @desc    delete a sponsor item
// @route   DELETE /api/sponsor/:_id
// @access  Private/Admin

const deleteSponsor = asyncHandler(async (req, res) => {
  const itemId = req.params._id;

  // Attempt to find and delete the item directly
  const deletedSponsor = await Sponsor.findByIdAndDelete(itemId);

  if (!deletedSponsor) {
    return res.status(404).json({ message: "Sponsor Item not found" });
  }

  // Decrease the sequenceNo of all items with a sequenceNo greater than the deleted item's sequenceNo
  await Sponsor.updateMany(
    { sequenceNo: { $gt: deletedSponsor.sequenceNo } },
    { $inc: { sequenceNo: -1 } }
  );

  res.json({ message: "Sponsor Item removed", item: deletedSponsor });
});

// @desc    create a sponsor item
// @route   POST /api/sponsor
// @access  Private/Admin

const createSponsor = asyncHandler(async (req, res) => {
  const { name, tier, image, sequenceNo } = req.body;

  const sponsor = new Sponsor({
    name,
    image,
    sequenceNo,
    tier,
  });

  const createdSponsor = await sponsor.save();
  res.status(201).json(createdSponsor);
});

// @desc    update a sponsor item
// @route   PUT /api/sponsor/:id
// @access  Private/Admin

const updateSponsor = asyncHandler(async (req, res) => {
  const {
    name,
    tier,
    image,
    sequenceNo: newSequenceNo,
  } = req.body;

  // Find the item to update
  const sponsor = await Sponsor.findById(req.params._id);
  if (!sponsor) {
    return res.status(404).json({ message: "Sponsor Item not found" });
  }

  // Proceed if the sequence number is actually changing
  if (
    newSequenceNo !== undefined &&
    newSequenceNo !== sponsor.sequenceNo
  ) {
    const adjustmentOperation =
      newSequenceNo > sponsor.sequenceNo
        ? { $gt: sponsor.sequenceNo, $lte: newSequenceNo }
        : { $gte: newSequenceNo, $lt: sponsor.sequenceNo };

    const adjustment = newSequenceNo > sponsor.sequenceNo ? -1 : 1;

    // Adjust sequence numbers of other items
    const updateResult = await Sponsor.updateMany(
      { sequenceNo: adjustmentOperation },
      { $inc: { sequenceNo: adjustment } }
    );

    if (!updateResult || updateResult.nModified === 0) {
      // Handle the case where the sequence adjustment did not work as expected
      return res
        .status(500)
        .json({ message: "Failed to resequence sponsor items" });
    }

    // Update the sequence number of the current item
    sponsor.sequenceNo = newSequenceNo;
  }

  // Update other fields
  sponsor.name = name ?? sponsor.name;
  sponsor.tier = tier ?? sponsor.tier;
  sponsor.image = image ?? sponsor.image;

  // Save the updated item
  await sponsor.save();

  // Respond with the updated item
  res.json(sponsor);
});

export {
  getSponsors,
  getSponsorById,
  deleteSponsor,
  createSponsor,
  updateSponsor,
};

import asyncHandler from "express-async-handler";
import Lodging from "../models/lodgingModel.js";

// @desc    get all lodging
// @route   GET /api/lodging
// @access  Public

const getAllLodging = asyncHandler(async (req, res) => {
  const lodging = await Lodging.find({}).sort({ name: 1 });
  res.json(lodging);
});

// @desc    get single lodging
// @route   GET /api/lodging/:_id
// @access  Public

const getLodgingById = asyncHandler(async (req, res) => {
  const lodging = await Lodging.findById(req.params._id);

  if (lodging) {
    res.json(lodging);
  } else {
    res.status(404);
    throw new Error(`Lodging with id:${req.params._id} not found`);
  }
});

// @desc    delete a lodging
// @route   DELETE /api/lodging/:_id
// @access  Private/Admin

const deleteLodging = asyncHandler(async (req, res) => {
  const deletedLodging = await Lodging.findByIdAndDelete(req.params._id);

  if (deletedLodging) {
    res.json({ message: "Lodging removed", item: deletedLodging });
  } else {
    res.status(404);
    throw new Error("Lodging not found");
  }
});

// @desc    create a lodging
// @route   POST /api/lodging
// @access  Private/Admin

const createLodging = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, website, city, description } = req.body;

  const lodging = new Lodging({
    name,
    address,
    phoneNumber,
    website,
    city,
    description,
  });

  const createdLodging = await lodging.save();
  res.status(201).json(createdLodging);
});

// @desc    update a lodging
// @route   PUT /api/lodging/:_id
// @access  Private/Admin

const updateLodging = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, website, city, description } = req.body;

  const lodging = await Lodging.findById(req.params._id);

  if (lodging) {
    if (name !== undefined) lodging.name = name;
    if (address !== undefined) lodging.address = address;
    if (phoneNumber !== undefined) lodging.phoneNumber = phoneNumber;
    if (website !== undefined) lodging.website = website;
    if (city !== undefined) lodging.city = city;
    if (description !== undefined) lodging.description = description;

    const updatedLodging = await lodging.save();
    res.json(updatedLodging);
  } else {
    res.status(404);
    throw new Error("Lodging not found");
  }
});

const deleteAllLodging = asyncHandler(async (req, res) => {
  const deletedLodgings = await Lodging.deleteMany({});

  if (deletedLodgings) {
    res.json({ message: "Lodgings removed" });
  } else {
    res.status(404);
    throw new Error("Lodging not found");
  }
});

export {
  getAllLodging,
  getLodgingById,
  deleteLodging,
  createLodging,
  updateLodging,
  deleteAllLodging,
};

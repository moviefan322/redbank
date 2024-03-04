import asyncHandler from "express-async-handler";
import Business from "../models/businessModel.js";

// @desc    get all businesses
// @route   GET /api/business
// @access  Public

const getAllBusinesses = asyncHandler(async (req, res) => {
  const business = await Business.find({}).sort({ name: 1 });
  res.json(business);
});

// @desc    get single business
// @route   GET /api/business/:_id
// @access  Public

const getBusinessById = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params._id);

  if (business) {
    res.json(business);
  } else {
    res.status(404);
    throw new Error(`Business with id:${req.params._id} not found`);
  }
});

// @desc    delete a business
// @route   DELETE /api/business/:_id
// @access  Private/Admin

const deleteBusiness = asyncHandler(async (req, res) => {
  const deletedBusiness = await Business.findByIdAndDelete(req.params._id);

  if (deletedBusiness) {
    res.json({ message: "Business removed", item: deletedBusiness });
  } else {
    res.status(404);
    throw new Error("Business not found");
  }
});

// @desc    create a business
// @route   POST /api/business
// @access  Private/Admin

const createBusiness = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, website } = req.body;

  const business = new Business({
    name,
    address,
    phoneNumber,
    website,
  });

  const createdBusiness = await business.save();
  res.status(201).json(createdBusiness);
});

// @desc    update a business
// @route   PUT /api/business/:_id
// @access  Private/Admin

const updateBusiness = asyncHandler(async (req, res) => {
  const { name, address, phoneNumber, website } = req.body;

  const business = await Business.findById(req.params._id);

  if (business) {
    if (name !== undefined) business.name = name;
    if (address !== undefined) business.address = address;
    if (phoneNumber !== undefined) business.phoneNumber = phoneNumber;
    if (website !== undefined) business.website = website;

    const updatedBusiness = await business.save();
    res.json(updatedBusiness);
  } else {
    res.status(404);
    throw new Error("Business not found");
  }
});

const deleteAllBusinesses = asyncHandler(async (req, res) => {
  const deletedBusinesss = await Business.deleteMany({});

  if (deletedBusinesss) {
    res.json({ message: "Businesss removed" });
  } else {
    res.status(404);
    throw new Error("Business not found");
  }
});

export {
  getAllBusinesses,
  getBusinessById,
  deleteBusiness,
  createBusiness,
  updateBusiness,
  deleteAllBusinesses,
};

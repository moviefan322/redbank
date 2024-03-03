import asyncHandler from "express-async-handler";
import BoardMember from "../models/boardMemberModel.js";

// @desc    get all boardMembers
// @route   GET /api/boardMember
// @access  Public

const getAllBoardMembers = asyncHandler(async (req, res) => {
  const boardMember = await BoardMember.find({}).sort({ createdAt: -1 });
  res.json(boardMember);
});

// @desc    get single boardMember
// @route   GET /api/boardMember/:_id
// @access  Public

const getBoardMemberById = asyncHandler(async (req, res) => {
  const boardMember = await BoardMember.findById(req.params._id);

  if (boardMember) {
    res.json(boardMember);
  } else {
    res.status(404);
    throw new Error(`BoardMember with id:${req.params._id} not found`);
  }
});

// @desc    delete a boardMember
// @route   DELETE /api/boardMember/:_id
// @access  Private/Admin

const deleteBoardMember = asyncHandler(async (req, res) => {
  const deletedBoardMember = await BoardMember.findByIdAndDelete(
    req.params._id
  );

  if (deletedBoardMember) {
    res.json({ message: "BoardMember removed", item: deletedBoardMember });
  } else {
    res.status(404);
    throw new Error("BoardMember not found");
  }
});

// @desc    create a boardMember
// @route   POST /api/boardMember
// @access  Private/Admin

const createBoardMember = asyncHandler(async (req, res) => {
  const {
    name,
    position,
    department,
    officerOrDirector,
    executiveCommitteeMember,
  } = req.body;

  const boardMember = new BoardMember({
    name,
    position,
    department,
    officerOrDirector,
    executiveCommitteeMember,
  });

  const createdBoardMember = await boardMember.save();
  res.status(201).json(createdBoardMember);
});

// @desc    update a boardMember
// @route   PUT /api/boardMember/:_id
// @access  Private/Admin

const updateBoardMember = asyncHandler(async (req, res) => {
  const {
    name,
    position,
    department,
    officerOrDirector,
    executiveCommitteeMember,
  } = req.body;

  const boardMember = await BoardMember.findById(req.params._id);

  if (boardMember) {
    if (name !== undefined) boardMember.name = name;
    if (position !== undefined) boardMember.position = position;
    if (department !== undefined) boardMember.department = department;
    if (officerOrDirector !== undefined)
      boardMember.officerOrDirector = officerOrDirector;
    if (executiveCommitteeMember !== undefined)
      boardMember.executiveCommitteeMember = executiveCommitteeMember;

    const updatedBoardMember = await boardMember.save();
    res.json(updatedBoardMember);
  } else {
    res.status(404);
    throw new Error("BoardMember not found");
  }
});

const deleteAllBoardMembers = asyncHandler(async (req, res) => {
  const deletedBoardMembers = await BoardMember.deleteMany({});

  if (deletedBoardMembers) {
    res.json({ message: "BoardMembers removed" });
  } else {
    res.status(404);
    throw new Error("BoardMember not found");
  }
});

export {
  getAllBoardMembers,
  getBoardMemberById,
  deleteBoardMember,
  createBoardMember,
  updateBoardMember,
  deleteAllBoardMembers,
};

import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc     get all users
//@route    GET /api/users
//@access   Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  // don't send password

  users.map((user) => {
    user.password = undefined;
  });

  res.json(users);
});

// @desc    Auth user/set token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, username: user.username });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, username: user.username });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// @route   POST /api/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
  };
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete all users
// @route   DELETE /api/users
// @access  Private/Admin

const deleteAllUsers = asyncHandler(async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All users deleted" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteAllUsers,
};

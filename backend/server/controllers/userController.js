import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

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
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("Invalid username or password");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(400);
    throw new Error("Invalid username or password");
  }

  if (user && checkPassword) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
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

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
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
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401);
    throw new Error("Authorization header missing");
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401);
    throw new Error("Invalid token");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;

    // Check if a new password is provided
    if (req.body.password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Update the user's password with the hashed password
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      token: generateToken(updatedUser._id), // Optionally regenerate the token if needed
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

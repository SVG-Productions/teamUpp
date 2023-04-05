const bcrypt = require("bcrypt");

const User = require("../models/User");

const createUser = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userObject = { username, email, hashed_password: hashedPassword };
    const user = await User.createUser(userObject);
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({ message: "Users fetched successfully.", users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || "Error fetching users.", error });
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.getSingleUser(userId);
    res.status(200).json({
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || "Error fetching user.", error });
  }
};

const getUserFavorites = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const favorites = await User.getUserFavorites(userId);
    res.status(200).json({
      message: "User favorites fetched successfully.",
      favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Error fetching user favorites.",
      error,
    });
  }
};

const getUserTeams = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const teams = await User.getUserTeams(userId);
    res.status(200).json({
      message: "User's teams fetched successfully.",
      teams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Error fetching user's teams.",
      error,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
};

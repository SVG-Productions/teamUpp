const User = require("../models/User");

const createUser = async (req, res, next) => {
  try {
    const userObject = {};
    const user = await User.createUser(userObject);
  } catch (error) {}
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({ message: "Users fetched successfully.", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users.", error });
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
    res.status(500).json({ message: "Error fetching user.", error });
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
    res.status(500).json({ message: "Error fetching user favorites.", error });
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
    res.status(500).json({ message: "Error fetching user's teams.", error });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
};

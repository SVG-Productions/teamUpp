const User = require("../models/User");

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
    const userId = req.params.userId;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user favorites.", error });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
};

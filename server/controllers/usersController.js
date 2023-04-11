const bcrypt = require("bcrypt");

const User = require("../models/User");
const { setTokenCookie } = require("../utils/auth");

const createUser = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userObject = { username, email, hashedPassword };
    const user = await User.createUser(userObject);
    await setTokenCookie(res, user);
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    if (users.length === 0) {
      return res.status(200).json({ message: "No users exist.", users });
    }
    res.status(200).json({ message: "Users fetched successfully.", users });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.getSingleUser(userId);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${userId} not found.`,
      });
    }
    res.status(200).json({
      message: "User fetched successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserFavorites = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const favorites = await User.getUserFavorites(userId);
    if (favorites.length === 0) {
      return res
        .status(200)
        .json({ message: "No favorites exist.", favorites });
    }
    res.status(200).json({
      message: "User favorites fetched successfully.",
      favorites,
    });
  } catch (error) {
    next(error);
  }
};

const getUserTeams = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userTeams = await User.getUserTeams(userId);
    if (userTeams.length === 0) {
      return res.status(200).json({ message: "No teams exist.", userTeams });
    }
    res.status(200).json({
      message: "User's teams fetched successfully.",
      userTeams,
    });
  } catch (error) {
    next(error);
  }
};

const getUserTeammates = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const teammates = await User.getUserTeammates(userId);
    if (teammates.length === 0) {
      return res
        .status(200)
        .json({ message: "No teammates exist.", teammates });
    }
    res.status(200).json({
      message: "User's teammates fetched successfully.",
      teammates,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: `User with id ${userId} not found.`,
      });
    }
    res.status(200).json({
      message: `User with id ${userId} has been deleted.`,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const updatedUser = await User.updateUser(userId, updates);
    if (!updatedUser) {
      return res.status(404).json({
        message: `User with id ${userId} not found.`,
      });
    }
    res.status(200).json({
      message: `User with id ${userId} has been updated`,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getIdByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userId = await User.getIdByUsername(username);
    if (!userId) {
      return res.status(404).json({
        message: `User with username ${username} not found.`,
      });
    }
    res.status(200).json({
      message: `UserId fetched successfully.`,
      userId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
  getUserTeammates,
  deleteUser,
  updateUser,
  getIdByUsername,
};

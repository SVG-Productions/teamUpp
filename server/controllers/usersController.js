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
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userId = await User.getIdByUsername(username);
    const user = await User.getPublicUser(userId);
    const teams = await User.getUserTeams(userId);
    const teammates = await User.getUserTeammates(userId);

    res.status(200).json({ user, teams, teammates });
  } catch (error) {
    next(error);
  }
};

const addUserFavorite = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { listingId } = req.body;
    const addedFavorite = await User.addUserFavorite(userId, listingId);

    res.status(200).json(addedFavorite);
  } catch (error) {
    next(error);
  }
};

const deleteUserFavorite = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { listingId } = req.body;
    const deletedFavorite = await User.deleteUserFavorite(userId, listingId);
    if (!deletedFavorite) {
      return res.status(404).json({
        message: `Favorite not found`,
      });
    }
    res.status(200).json(deletedFavorite);
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
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  addUserFavorite,
  deleteUserFavorite,
  deleteUser,
  updateUser,
};

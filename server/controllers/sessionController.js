const bcrypt = require("bcrypt");

const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");

const getSession = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else return res.status(200).json(null);
};

const getSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.getSessionUser(id);
    const favorites = await User.getUserFavorites(id);
    const teams = await User.getUserTeams(id);
    const teammates = await User.getUserTeammates(id);
    const recommendedTeams = await User.getRecommendedTeams(id);
    const recentActivity = await User.getRecentActivity(id);
    const jobFields = await User.getUserJobFields(id);

    res.status(200).json({
      user,
      favorites,
      teams,
      teammates,
      recommendedTeams,
      recentActivity,
      jobFields,
    });
  } catch (error) {
    next(error);
  }
};

const updateSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updates = req.body;

    const updatedUser = await User.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
    }
    res.status(200).json({
      message: `User with id ${id} has been deleted.`,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.loginUser(credential, password);

  if (!user) {
    const err = new Error("Login failed. Invalid credentials.");
    err.status = 401;
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.status(200).json(user);
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(204).end();
};

const updatePassword = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { id } = req.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.updatePassword(id, hashedPassword);

    return res.status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  getSession,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updatePassword,
};

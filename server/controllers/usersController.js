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

const getPublicUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { id, ...user } = await User.getPublicUser(username);
    const teams = await User.getUserTeams(id);
    const teammates = await User.getUserTeammates(id);

    res.status(200).json({ user, teams, teammates });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getPublicUser,
};

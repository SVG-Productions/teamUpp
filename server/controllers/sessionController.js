const { setTokenCookie } = require("../utils/auth");

const User = require("../models/User");
const Team = require("../models/Team");

const getSession = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else return res.status(200).json(null);
};

const getSessionUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.getSessionUser(id);
    const favorites = await User.getUserFavorites(id);
    const teams = await User.getUserTeams(id);
    const teammates = await User.getUserTeammates(id);
    const recommendedTeams = await Team.getRecommendedTeams(id);

    res
      .status(200)
      .json({ user, favorites, teams, teammates, recommendedTeams });
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

module.exports = {
  loginUser,
  logoutUser,
  getSession,
  getSessionUser,
};

const { setTokenCookie } = require("../utils/auth");

const User = require("../models/User");

const getSessionUser = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else return res.status(200).json(null);
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
  getSessionUser,
};

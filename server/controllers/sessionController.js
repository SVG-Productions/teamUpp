const { setTokenCookie } = require("../utils/auth");

const User = require("../models/User");

const getSessionUser = async (req, res) => {
  //TODO: ADD BUSINESS LOGIC -- status codes, data
  const { user } = req;
  if (user) {
    return res.json(user);
  } else return res.json(null);
};

const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;
  console.log("credential", credential);
  console.log("password", password);

  const user = await User.loginUser(credential, password);

  if (!user) {
    const err = new Error("Login failed. Invalid credentials.");
    err.status = 401;
    return next(err);
  }

  await setTokenCookie(res, user);

  return res
    .status(200)
    .json({ message: "User logged in successfully.", user });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout successful." });
};

module.exports = {
  loginUser,
  logoutUser,
  getSessionUser,
};

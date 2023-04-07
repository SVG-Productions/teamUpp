const { setTokenCookie } = require("../utils/auth");

const User = require("../models/User");

const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.loginUser(credential, password);

  if (!user) {
    const err = new Error("Login failed. Invalid credentials.");
    err.status = 401;
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({
    user: user,
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout successful." });
};

const restoreXsrfToken = (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
};

module.exports = {
  loginUser,
  logoutUser,
  restoreXsrfToken,
};

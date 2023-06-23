require("dotenv").config();
const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");
const { verifyGoogleToken } = require("../utils/googleAuth");

const getAuth = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(200).json(null);
  }
};

const loginUser = async (req, res, next) => {
  let user;
  try {
    // Google
    if (req.body.googleCredential) {
      const verificationRes = await verifyGoogleToken(
        req.body.googleCredential
      );
      if (verificationRes.error) {
        return res.status(400).json({
          message: verificationRes.error,
        });
      }

      const profile = verificationRes?.payload;

      user = await User.getUserByEmail(profile.email);

      if (!user) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      // Email
    } else {
      // TODO: Add body validation
      const { credential, password } = req.body;

      user = await User.loginUser(credential, password);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Login failed. Invalid credentials." });
      }
    }

    if (user.accountStatus !== "active") {
      return res.status(401).json({
        message: "Account verification pending. Please check your email.",
      });
    }

    await setTokenCookie(res, user);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(204).end();
};

module.exports = {
  getAuth,
  loginUser,
  logoutUser,
};

require("dotenv").config();
const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");
const { verifyGoogleToken } = require("../utils/googleAuth");

const getSession = async (req, res) => {
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

const verifyUser = async (req, res, next) => {
  try {
    const confirmationCode = req.params.confirmationCode;
    const user = await User.getUserByConfirmationCode(confirmationCode);

    if (!user) {
      return res.status(401).json({
        message: "No user found with this confirmation code. Please try again.",
      });
    }

    await User.updateUser(user.id, { accountStatus: "active" });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSession,
  loginUser,
  logoutUser,
  verifyUser,
};

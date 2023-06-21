const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");
const { verifyGoogleToken } = require("../utils/googleAuth");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const { sendConfirmationEmail } = require("../utils/nodemailer.config");

const getSession = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(200).json(null);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { credential, password } = req.body;
    const user = await User.loginUser(credential, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Login failed. Invalid credentials." });
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

const createUser = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { username, email, password, avatar } = req.body;
    const userCheck = await User.getUserByEmail(email);
    if (userCheck) {
      return res.status(401).json({
        message: "Account already exists. Please login.",
      });
    }

    const token = jwt.sign({ email }, jwtSecret);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userObject = {
      username,
      email,
      hashedPassword,
      confirmationCode: token,
      authType: "email",
      avatar,
    };
    const user = await User.createUser(userObject);
    await sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    );
    res.status(201).json({
      message:
        "User was registered successfully. Please check your email to verify.",
    });
  } catch (error) {
    next(error);
  }
};

const googleLoginUser = async (req, res, next) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = await User.getUserByEmail(profile.email);

      if (!user) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      if (user.accountStatus !== "active") {
        return res.status(401).json({
          message: "Account verification pending. Please check your email.",
        });
      }

      await setTokenCookie(res, user);

      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const googleSignupUser = async (req, res, next) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }
      const profile = verificationResponse?.payload;
      const token = jwt.sign({ email: profile?.email }, jwtSecret);
      const userCheck = await User.getUserByEmail(profile.email);
      if (userCheck) {
        return res.status(401).json({
          message: "Account already exists. Please login.",
        });
      }

      const userObject = {
        username:
          profile?.email.substring(0, profile?.email.indexOf("@")) +
          "-" +
          profile.sub.slice(-4),
        email: profile?.email,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        photo: profile?.picture,
        confirmationCode: token,
        authType: "google",
        avatar: `/user/avatars/avatar${Math.floor(Math.random() * 12) + 1}.png`,
      };
      const user = await User.createUser(userObject);

      await sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
      );
      res.status(201).json({
        message:
          "User was registered successfully. Please check your email to verify.",
      });
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(204).end();
};

const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match." });
    }

    await User.updatePassword(id, oldPassword, newPassword);

    return res.status(200).json({ message: "Password successfully updated!" });
  } catch (error) {
    next(error);
  }
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
  loginUser,
  googleLoginUser,
  googleSignupUser,
  logoutUser,
  getSession,
  updatePassword,
  verifyUser,
  createUser,
};

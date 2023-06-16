require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendResetPasswordEmail,
  sendContactUsEmail,
} = require("../utils/nodemailer.config");
const jwtSecret = process.env.JWT_SECRET;

const createUser = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { username, email, password, avatar } = req.body;
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
    const user = await User.getPublicUser(username);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this username not found." });
    }
    const teams = await User.getUserTeams(user.id);
    const teammates = await User.getUserTeammates(user.id);
    const jobFields = await User.getUserJobFields(user.id);
    const socials = await User.getUserSocials(user.id);

    res.status(200).json({ ...user, teams, teammates, jobFields, socials });
  } catch (error) {
    next(error);
  }
};

const updateUserResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found." });
    }

    const resetPasswordToken = jwt.sign({ email }, jwtSecret, {
      expiresIn: 600,
    });

    const updatedUser = await User.updateUser(user.id, {
      resetPassword: resetPasswordToken,
    });
    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "Password reset token assignment unsuccessful." });
    }

    const { username } = updatedUser;

    await sendResetPasswordEmail(username, email, resetPasswordToken);

    res.status(200).json({
      message:
        "Email sent. Please check your inbox for a link to reset password.",
    });
  } catch (error) {
    return next(error);
  }
};

const resetUserPassword = async (req, res, next) => {
  const { resetPassword } = req.params;
  const { newPassword, confirmNewPassword } = req.body;
  const saltRounds = 12;

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (resetPassword) {
    jwt.verify(resetPassword, jwtSecret, null, async (error, jwtPayload) => {
      if (error) {
        return res.status(400).json({
          message: "Reset password token has expired.",
          isExpired: true,
        });
      }
      try {
        const user = await User.getUserByEmail(jwtPayload.email);
        if (!user) {
          return res
            .status(404)
            .json({ message: "User with this email not found." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.updateUser(user.id, { hashedPassword });
        res.status(200).json({
          message:
            "You have succesfully reset your password! Please proceed to login.",
        });
      } catch (error) {
        next(error);
      }
    });
  } else {
    return res.status(400).json({ message: "No token exists." });
  }
};

const sendUserFeedback = async (req, res, next) => {
  const { email, subject, message } = req.body;
  try {
    await sendContactUsEmail(email, subject, message);
    res.status(200).json({ message: "Message succesfully sent!" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getPublicUser,
  updateUserResetPassword,
  resetUserPassword,
  sendUserFeedback,
};

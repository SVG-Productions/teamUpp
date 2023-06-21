require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  deleteFileFromS3,
} = require("../utils/awsS3");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  sendResetPasswordEmail,
  sendContactUsEmail,
} = require("../utils/nodemailer.config");
const jwtSecret = process.env.JWT_SECRET;

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.getSessionUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favorites = await User.getUserFavorites(id);
    const teams = await User.getUserTeams(id);
    const teammates = await User.getUserTeammates(id);
    const recommendedTeams = await User.getRecommendedTeams(id);
    const recentActivity = await User.getRecentActivity(id);
    const jobFields = await User.getUserJobFields(id);
    const invites = await User.getTeamInvites(id);
    const socials = await User.getUserSocials(id);

    res.status(200).json({
      ...user,
      favorites,
      teams,
      teammates,
      recommendedTeams,
      recentActivity,
      jobFields,
      invites,
      socials,
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
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User successfully updated." });
  } catch (error) {
    next(error);
  }
};

const deleteSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User successfully deleted.",
    });
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

const updateUserAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updates = req.body;
    const { avatar } = await User.updateUser(id, updates);
    if (!avatar) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User avatar successfully updated." });
  } catch (error) {
    next(error);
  }
};

const updateUserPhoto = async (req, res, next) => {
  try {
    const { id } = req.user;

    const upload = singleMulterUpload("photo");

    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Failed to upload photo." });
      }

      const photoUrl = await singlePublicFileUpload(req.file, false);

      const updates = { photo: photoUrl };
      const updatedUser = await User.updateUser(id, updates);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res
        .status(200)
        .json({ ...updatedUser, message: "User photo successfully uploaded." });
    });
  } catch (error) {
    next(error);
  }
};

const removeUserPhoto = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.getSessionUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { photo } = user;
    if (photo) {
      const filename = photo.split("/").pop();
      await deleteFileFromS3(filename, false);
    }

    const updates = { photo: null };
    await User.updateUser(id, updates);

    res.status(200).json({ message: "User photo successfully removed." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getPublicUser,
  updateUserResetPassword,
  resetUserPassword,
  sendUserFeedback,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updateUserAvatar,
  updateUserPhoto,
  removeUserPhoto,
};

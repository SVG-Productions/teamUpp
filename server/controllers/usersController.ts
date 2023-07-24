import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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
  sendConfirmationEmail,
} = require("../utils/nodemailer.config");
const { verifyGoogleToken } = require("../utils/googleAuth");
const jwtSecret = process.env.JWT_SECRET;

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const saltRounds = 12;
  let userObject;
  // Google
  if (req.body.googleCredential) {
    const verificationRes = await verifyGoogleToken(req.body.googleCredential);
    if (verificationRes.error) {
      return res.status(400).json({
        message: verificationRes.error,
      });
    }
    const profile = verificationRes?.payload;
    const token = jwt.sign({ email: profile?.email }, jwtSecret);

    userObject = {
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
    // Email
  } else {
    const { username, email, password } = req.body;
    const token = jwt.sign({ email }, jwtSecret);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userObject = {
      username,
      email,
      hashedPassword,
      confirmationCode: token,
      authType: "email",
      avatar: `/user/avatars/avatar${Math.floor(Math.random() * 12) + 1}.png`,
    };
  }
  const userCheck = await User.getUserByEmail(userObject.email);
  if (userCheck) {
    return res.status(401).json({
      message: "Account already exists. Please login.",
    });
  }
  const user = await User.createUser(userObject);
  await sendConfirmationEmail(user.username, user.email, user.confirmationCode);
  res.status(201).json({
    message:
      "User was registered successfully. Please check your email to verify.",
  });
  try {
  } catch (error) {
    next(error);
  }
};

const getSessionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
    const user = await User.getSessionUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favorites = await User.getUserFavorites(id, req.query);
    const teams = await User.getUserTeams(id);
    const teammates = await User.getUserTeammates(id);
    const recommendedTeams = await User.getRecommendedTeams(id);
    const recentActivity = await User.getRecentActivity(id);
    const jobFields = await User.getUserJobFields(id);
    const invites = await User.getTeamInvites(id);
    const socials = await User.getUserSocials(id);
    const listings = await User.getUserListings(id);
    const appStatuses = await User.getUserAppStatuses(id);

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

const updateSessionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
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

const deleteSessionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
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

const getPublicUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const updateUserResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const resetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetPassword } = req.params;
  const { newPassword, confirmNewPassword } = req.body;
  const saltRounds = 12;

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  if (!resetPassword) {
    return res.status(400).json({ message: "No token exists." });
  }

  jwt.verify(
    resetPassword,
    jwtSecret,
    null,
    async (error: any, jwtPayload: JwtPayload) => {
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
    }
  );
};

const sendUserFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, subject, message } = req.body;
  try {
    await sendContactUsEmail(email, subject, message);
    res.status(200).json({ message: "Message succesfully sent!" });
  } catch (error) {
    return next(error);
  }
};

const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
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

const updateUserPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
    const upload = singleMulterUpload("photo");

    upload(req, res, async function (err: any) {
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

const removeUserPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;

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

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
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

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
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
  getAllUsers,
  createUser,
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
  updatePassword,
  verifyUser,
};

export {};

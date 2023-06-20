const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  deleteFileFromS3,
} = require("../utils/awsS3");
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
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updatePassword,
  updateUserAvatar,
  updateUserPhoto,
  removeUserPhoto,
  verifyUser,
};

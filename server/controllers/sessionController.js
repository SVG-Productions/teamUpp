const { setTokenCookie } = require("../utils/auth");
const User = require("../models/User");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  deleteFileFromS3,
} = require("../utils/awsS3");

const getSession = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  } else {
    const error = new Error("User not found.");
    error.status = 404;
    return next(error);
  }
};

const getSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.getSessionUser(id);
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
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
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      message: "User successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.loginUser(credential, password);

  if (!user) {
    const err = new Error("Login failed. Invalid credentials.");
    err.status = 401;
    return next(err);
  }

  if (user.accountStatus !== "active") {
    const err = new Error(
      "Account verification pending. Please check your email"
    );
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

const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword !== newPassword) {
      const error = new Error("Passwords do not match.");
      error.status = 400;
      return next(error);
    }

    await User.updatePassword(id, oldPassword, newPassword);

    return res.sendStatus(200);
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
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(avatar);
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
        const error = new Error("Failed to upload photo.");
        error.status = 404;
        return next(error);
      }

      const photoUrl = await singlePublicFileUpload(req.file, false);

      const updates = { photo: photoUrl };
      const updatedUser = await User.updateUser(id, updates);

      if (!updatedUser) {
        const error = new Error("User not found.");
        error.status = 404;
        return next(error);
      }

      res.status(200).json(updatedUser);
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
      const error = new Error("User not found.");
      error.status = 404;
      return next(error);
    }

    const { photo } = user;
    if (photo) {
      const filename = photo.split("/").pop();
      await deleteFileFromS3(filename, false);
    }

    const updates = { photo: null };
    const updatedUser = await User.updateUser(id, updates);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const confirmationCode = req.params.confirmationCode;
    const user = await User.getUserByConfirmationCode(confirmationCode);

    if (!user) {
      const err = new Error(
        "No user found with this confirmation code. Please try again."
      );
      err.status = 401;
      return next(err);
    }

    await User.updateUser(user.id, { accountStatus: "active" });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
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

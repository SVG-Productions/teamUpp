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
  } else return res.status(200).json(null);
};

const getSessionUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.getSessionUser(id);
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
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
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
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
    }
    res.status(200).json({
      message: `User with id ${id} has been deleted.`,
      deletedUser,
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
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
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
        return res.status(400).json({ message: "Failed to upload photo." });
      }

      const photoUrl = await singlePublicFileUpload(req.file);

      const updates = { photo: photoUrl };
      const updatedUser = await User.updateUser(id, updates);

      if (!updatedUser) {
        return res.status(404).json({
          message: `User with id ${id} not found.`,
        });
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
      return res.status(404).json({
        message: `User with id ${id} not found.`,
      });
    }

    const { photo } = user;
    if (photo) {
      const filename = photo.split("/").pop();
      await deleteFileFromS3(filename);
    }

    const updates = { photo: null };
    const updatedUser = await User.updateUser(id, updates);

    res.status(200).json(updatedUser);
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
};

const express = require("express");
const router = express.Router();

const {
  validateUpdateUser,
  validateFileType,
  validatePassword,
  validateSignup,
} = require("../utils/validation");
const { requireAuth } = require("../utils/auth");
const {
  getAllUsers,
  getPublicUser,
  updateUserResetPassword,
  resetUserPassword,
  sendUserFeedback,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updateUserPhoto,
  updateUserAvatar,
  removeUserPhoto,
  updatePassword,
  createUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/user", requireAuth, getSessionUser);
router.patch("/user", requireAuth, validateUpdateUser, updateSessionUser);
router.delete("/user", requireAuth, deleteSessionUser);
router.patch("/user/photo", requireAuth, validateFileType, updateUserPhoto);
router.delete("/user/photo", requireAuth, removeUserPhoto);
router.patch("/user/avatar", requireAuth, updateUserAvatar);
router.patch("/user/password", requireAuth, validatePassword, updatePassword);
router.patch("/forgot-password", updateUserResetPassword);
router.patch("/reset-password/:resetPassword", resetUserPassword);
router.post("/send-feedback", sendUserFeedback);
router.get("/:username", getPublicUser);

module.exports = router;

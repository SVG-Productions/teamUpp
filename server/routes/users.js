const express = require("express");
const router = express.Router();

const {
  validateSignup,
  validateUpdateUser,
  validateFileType,
} = require("../utils/validation");
const {
  getAllUsers,
  getPublicUser,
  // createUser,
  updateUserResetPassword,
  resetUserPassword,
  sendUserFeedback,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updateUserPhoto,
  updateUserAvatar,
  removeUserPhoto,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
// router.post("/", validateSignup, createUser);
router.get("/user", getSessionUser);
router.patch("/user", validateUpdateUser, updateSessionUser);
router.delete("/user", deleteSessionUser);
router.patch("/user/photo", validateFileType, updateUserPhoto);
router.delete("/user/photo", removeUserPhoto);
router.patch("/user/avatar", updateUserAvatar);
router.patch("/forgot-password", updateUserResetPassword);
router.patch("/reset-password/:resetPassword", resetUserPassword);
router.post("/send-feedback", sendUserFeedback);
router.get("/:username", getPublicUser);

module.exports = router;

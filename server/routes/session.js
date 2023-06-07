const express = require("express");
const router = express.Router();

const {
  validateLogin,
  validateUpdateUser,
  validatePassword,
} = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getSession,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
  updatePassword,
  updateUserPhoto,
  updateUserAvatar,
  removeUserPhoto,
} = require("../controllers/sessionController");

router.get("/", getSession);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
router.get("/user", getSessionUser);
router.patch("/user", validateUpdateUser, updateSessionUser);
router.delete("/user", deleteSessionUser);
router.patch("/user/photo", updateUserPhoto);
router.delete("/user/photo", removeUserPhoto);
router.patch("/user/avatar", updateUserAvatar);
router.patch("/password", validatePassword, updatePassword);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  validateSignup,
  validateLogin,
  validatePassword,
} = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  googleLoginUser,
  googleSignupUser,
  getSession,
  updatePassword,
  createUser,
  verifyUser,
} = require("../controllers/sessionController");

router.get("/", getSession);
router.delete("/", logoutUser);
router.post("/email/login", validateLogin, loginUser);
router.post("/email/signup", validateSignup, createUser);
router.post("/google/login", googleLoginUser);
router.post("/google/signup", googleSignupUser);
// router.get("/user", getSessionUser);
// router.patch("/user", validateUpdateUser, updateSessionUser);
// router.delete("/user", deleteSessionUser);
// router.patch("/user/photo", validateFileType, updateUserPhoto);
// router.delete("/user/photo", removeUserPhoto);
// router.patch("/user/avatar", updateUserAvatar);
router.patch("/password", validatePassword, updatePassword);
router.patch("/confirm/:confirmationCode", verifyUser);

module.exports = router;

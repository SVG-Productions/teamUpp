const express = require("express");
const router = express.Router();

const { validateSignup, validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  googleLoginUser,
  googleSignupUser,
  getSession,
  createUser,
  verifyUser,
} = require("../controllers/sessionController");

router.get("/", getSession);
router.delete("/", logoutUser);
router.post("/email/login", validateLogin, loginUser);
router.post("/email/signup", validateSignup, createUser);
router.post("/google/login", googleLoginUser);
router.post("/google/signup", googleSignupUser);
router.patch("/confirm/:confirmationCode", verifyUser);

module.exports = router;

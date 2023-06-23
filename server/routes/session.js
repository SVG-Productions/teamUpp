const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  googleLoginUser,
  getSession,
  verifyUser,
} = require("../controllers/sessionController");

router.get("/", getSession);
router.delete("/", logoutUser);
router.post("/email", validateLogin, loginUser);
router.post("/google", googleLoginUser);
router.patch("/confirm/:confirmationCode", verifyUser);

module.exports = router;

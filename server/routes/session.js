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
} = require("../controllers/sessionController");

router.get("/", getSession);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
router.get("/user", getSessionUser);
router.patch("/user", validateUpdateUser, updateSessionUser);
router.delete("/user", deleteSessionUser);
router.patch("/password", validatePassword, updatePassword);

module.exports = router;

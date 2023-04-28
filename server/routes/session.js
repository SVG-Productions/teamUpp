const express = require("express");
const router = express.Router();

const { validateLogin, validateUpdateUser } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getSession,
  getSessionUser,
  updateSessionUser,
  deleteSessionUser,
} = require("../controllers/sessionController");

router.get("/", getSession);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
router.get("/user", getSessionUser);
router.patch("/user", validateUpdateUser, updateSessionUser);
router.delete("/user", deleteSessionUser);

module.exports = router;

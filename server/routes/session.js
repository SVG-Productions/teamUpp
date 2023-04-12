const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getSessionUser,
} = require("../controllers/sessionController");
const { restoreUser } = require("../utils/auth");

router.get("/", restoreUser, getSessionUser);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);

module.exports = router;

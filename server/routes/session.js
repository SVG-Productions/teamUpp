const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getSessionUser,
} = require("../controllers/sessionController");

router.get("/", getSessionUser);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);

module.exports = router;

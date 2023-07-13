const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getAuth,
} = require("../controllers/authController");

router.get("/", getAuth);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);

module.exports = router;
export {};

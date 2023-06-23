const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getAuth,
  verifyUser,
} = require("../controllers/authController");

router.get("/", getAuth);
router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
// TODO: Move this route
router.patch("/confirm/:confirmationCode", verifyUser);

module.exports = router;

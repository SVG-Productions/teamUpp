const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  getSession,
  getSessionUser,
} = require("../controllers/sessionController");

router.get("/", getSession);

router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
router.get("/user", getSessionUser);

// router.post("/user", createUser)
// router.patch("/user", updateUser)   *needs a check against sessionedUser
// router.delete("/user", deleteUser)   *needs a check against sessionedUser

module.exports = router;

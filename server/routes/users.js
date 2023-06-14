const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getPublicUser,
  createUser,
  updateUserResetPassword,
  resetUserPassword,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.patch("/forgot-password", updateUserResetPassword);
router.patch("/reset-password/:resetPassword", resetUserPassword);
router.get("/:username", getPublicUser);

module.exports = router;

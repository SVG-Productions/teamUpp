const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getUser,
  createUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:username", getUser);

module.exports = router;

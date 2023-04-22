const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getUser,
  addUserFavorite,
  deleteUserFavorite,
  createUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:username", getUser);

// These also need to find a new home, these are always private
router.post("/:userId/favorites", addUserFavorite);
router.delete("/:userId/favorites", deleteUserFavorite);

module.exports = router;

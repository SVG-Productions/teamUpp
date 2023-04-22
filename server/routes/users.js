const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getUser,
  addUserFavorite,
  deleteUserFavorite,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);

// This needs to be modified to only return public data
router.get("/:username", getUser);

// These two will move to session, needs to be authorized against session user
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

// These also need to find a new home, these are always private
router.post("/:userId/favorites", addUserFavorite);
router.delete("/:userId/favorites", deleteUserFavorite);

module.exports = router;

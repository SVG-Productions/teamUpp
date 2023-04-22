const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  addUserFavorite,
  deleteUserFavorite,
  getUserTeams,
  createUser,
  getUserTeammates,
  deleteUser,
  updateUser,
  getIdByUsername,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:username", getSingleUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/:userId/favorites", addUserFavorite);
router.delete("/:userId/favorites", deleteUserFavorite);

router.get("/:userId/favorites", getUserFavorites);
router.get("/:userId/user-teams", getUserTeams);
router.get("/:userId/teammates", getUserTeammates);
router.get("/usernames/:username", getIdByUsername);

module.exports = router;

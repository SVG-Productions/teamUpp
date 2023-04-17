const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  addUserFavorite,
  getUserTeams,
  createUser,
  getUserTeammates,
  deleteUser,
  updateUser,
  getIdByUsername,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:userId", getSingleUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/:userId/favorites", getUserFavorites);
router.post("/:userId/favorites", addUserFavorite);
router.get("/:userId/user-teams", getUserTeams);
router.get("/:userId/teammates", getUserTeammates);
router.get("/usernames/:username", getIdByUsername);

module.exports = router;

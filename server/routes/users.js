var express = require("express");
var router = express.Router();
var { cache, deleteCache } = require("../routeCache");

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
  createUser,
  getUserTeammates,
  deleteUser,
  updateUser,
  getIdByUsername,
} = require("../controllers/usersController");

router.get("/", cache(300), getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:userId", cache(300), getSingleUser);
router.patch("/:userId", deleteCache(), updateUser);
router.delete("/:userId", deleteUser);
router.get("/:userId/favorites", cache(300), getUserFavorites);
router.get("/:userId/user-teams", cache(300), getUserTeams);
router.get("/:userId/teammates", cache(300), getUserTeammates);
router.get("/usernames/:username", cache(300), getIdByUsername);

module.exports = router;

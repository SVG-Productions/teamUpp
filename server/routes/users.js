var express = require("express");
var router = express.Router();

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
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:userId", getSingleUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/:userId/favorites", getUserFavorites);
router.get("/:userId/teams", getUserTeams);
router.get("/:userId/teammates", getUserTeammates);

module.exports = router;

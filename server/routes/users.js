var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
  createUser,
  getUserTeammates,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:userId", getSingleUser);
router.delete("/:userId", deleteUser);
router.get("/:userId/favorites", getUserFavorites);
router.get("/:userId/teams", getUserTeams);
router.get("/:userId/teammates", getUserTeammates);

module.exports = router;

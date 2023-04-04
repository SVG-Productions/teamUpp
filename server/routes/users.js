var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.get("/:userId/favorites", getUserFavorites);
router.get("/:userId/teams", getUserTeams);

module.exports = router;

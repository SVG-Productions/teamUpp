var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
  createUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/create", createUser);
router.get("/:userId", getSingleUser);
router.get("/:userId/favorites", getUserFavorites);
router.get("/:userId/teams", getUserTeams);

module.exports = router;

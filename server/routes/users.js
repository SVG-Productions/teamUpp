var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  getUserFavorites,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.get("/:userId/favorites", getUserFavorites);

module.exports = router;

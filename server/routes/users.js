var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getSingleUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);

router.get("/:userId", getSingleUser);

module.exports = router;

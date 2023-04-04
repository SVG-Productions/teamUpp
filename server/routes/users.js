var express = require("express");
var router = express.Router();
const { getAllUsers } = require("../controllers/usersController");
const { getSingleUser } = require("../models/User");

router.get("/", getAllUsers);

router.get("/:userId", getSingleUser);

module.exports = router;

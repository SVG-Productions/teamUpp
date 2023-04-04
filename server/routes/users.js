var express = require("express");
var router = express.Router();
const { getAllUsers } = require("../controllers/usersController");

router.get("/", getAllUsers);

router.get("/:userId");

module.exports = router;

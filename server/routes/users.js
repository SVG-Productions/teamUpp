var express = require("express");
var router = express.Router();
const { getAllUsers } = require("../controllers/usersController");

/* GET users. */
router.get("/", getAllUsers);

module.exports = router;

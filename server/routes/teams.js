var express = require("express");
var router = express.Router();

const { getAllTeams } = require("../controllers/teamsController");

/* GET teams. */
router.get("/", getAllTeams);

module.exports = router;

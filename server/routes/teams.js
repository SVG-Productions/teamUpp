var express = require("express");
var router = express.Router();

const {
  getAllTeams,
  getSingleTeam,
} = require("../controllers/teamsController");

/* GET teams. */
router.get("/", getAllTeams);
router.get("/:teamId", getSingleTeam);

module.exports = router;

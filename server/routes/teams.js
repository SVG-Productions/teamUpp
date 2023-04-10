var express = require("express");
var router = express.Router();

const {
  getAllTeams,
  getSingleTeam,
  getAllTeammates,
  getAllTeamListings,
} = require("../controllers/teamsController");

/* GET teams. */
router.get("/", getAllTeams);
router.get("/:teamId", getSingleTeam);
router.get("/:teamId/teammates", getAllTeammates);
router.get("/:teamId/listings", getAllTeamListings);

module.exports = router;

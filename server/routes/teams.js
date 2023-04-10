var express = require("express");
var router = express.Router();

const {
  getAllTeams,
  getSingleTeam,
  getAllTeammates,
  getAllTeamListings,
  createTeam,
} = require("../controllers/teamsController");

/* GET teams. */
router.get("/", getAllTeams);
router.get("/:teamId", getSingleTeam);
router.get("/:teamId/teammates", getAllTeammates);
router.get("/:teamId/listings", getAllTeamListings);
router.post("/", createTeam);

module.exports = router;

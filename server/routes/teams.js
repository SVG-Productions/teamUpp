var express = require("express");
var router = express.Router();

const {
  getAllTeams,
  createTeam,
  getSingleTeam,
  addUserToTeam,
  getAllTeammates,
  getAllTeamListings,
} = require("../controllers/teamsController");

/* GET teams. */
router.get("/", getAllTeams);
router.post("/", createTeam);
router.get("/:teamId", getSingleTeam);
router.post("/:teamId/teammates", addUserToTeam);
router.get("/:teamId/teammates", getAllTeammates);
router.get("/:teamId/listings", getAllTeamListings);

module.exports = router;

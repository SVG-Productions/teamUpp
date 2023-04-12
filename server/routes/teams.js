var express = require("express");
var router = express.Router();
var { cache, deleteCache } = require("../routeCache");

const {
  getAllTeams,
  createTeam,
  getSingleTeam,
  getAllTeammates,
  getAllTeamListings,
} = require("../controllers/teamsController");

router.get("/", cache(300), getAllTeams);
router.post("/", deleteCache(), createTeam);
router.get("/:teamId", cache(300), getSingleTeam);
router.get("/:teamId/teammates", cache(300), getAllTeammates);
router.get("/:teamId/listings", cache(300), getAllTeamListings);

module.exports = router;

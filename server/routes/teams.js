const express = require("express");
const router = express.Router();

const { cache, deleteCache } = require("../utils/cache");
const {
  getAllTeams,
  createTeam,
  getSingleTeam,
  addUserToTeam,
  getAllTeammates,
  getAllTeamListings,
  updateTeammateStatus,
  deleteTeammate,
} = require("../controllers/teamsController");

router.get("/", cache(300), getAllTeams);
router.post("/", deleteCache(), createTeam);
router.get("/:teamId", cache(300), getSingleTeam);
router.get("/:teamId/teammates", cache(300), getAllTeammates);
router.post("/:teamId/teammates", addUserToTeam);
router.patch("/:teamId/teammates", updateTeammateStatus);
router.delete("/:teamId/teammates", deleteTeammate);
router.get("/:teamId/listings", cache(300), getAllTeamListings);

module.exports = router;

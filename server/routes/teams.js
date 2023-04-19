const express = require("express");
const router = express.Router();

const {
  getAllTeams,
  createTeam,
  getSingleTeam,
  addUserToTeam,
  getAllTeammates,
  getAllTeamListings,
  getRecommendedTeams,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamsController");

router.get("/", getAllTeams);
router.post("/", createTeam);
router.get("/recommended/:userId", getRecommendedTeams);
router.get("/:teamId", getSingleTeam);
router.patch("/:teamId", updateTeam);
router.delete("/:teamId", deleteTeam);
router.get("/:teamId/teammates", getAllTeammates);
router.post("/:teamId/teammates", addUserToTeam);
router.patch("/:teamId/teammates", updateTeammateStatus);
router.delete("/:teamId/teammates", deleteTeammate);
router.get("/:teamId/listings", getAllTeamListings);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllTeams,
  createTeam,
  getSingleTeam,
  addUserToTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamsController");

router.get("/", getAllTeams);
router.post("/", createTeam);
router.get("/:teamId", getSingleTeam);
router.patch("/:teamId", updateTeam);
router.delete("/:teamId", deleteTeam);
router.post("/:teamId/teammates", addUserToTeam);
router.patch("/:teamId/teammates", updateTeammateStatus);
router.delete("/:teamId/teammates", deleteTeammate);

module.exports = router;

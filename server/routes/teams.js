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
const { validateTeam } = require("../utils/validation");

router.get("/", getAllTeams);
router.post("/", validateTeam, createTeam);
router.get("/:teamId", getSingleTeam);
router.patch("/:teamId", validateTeam, updateTeam);
router.delete("/:teamId", deleteTeam);
router.post("/:teamId/teammates", addUserToTeam);
router.patch("/:teamId/teammates", updateTeammateStatus);
router.delete("/:teamId/teammates", deleteTeammate);

module.exports = router;

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
  updateTeamAvatar,
  updateTeamPhoto,
  removeTeamPhoto,
} = require("../controllers/teamsController");
const { validateTeam, validateFileType } = require("../utils/validation");

router.get("/", getAllTeams);
router.post("/", validateTeam, createTeam);
router.get("/:teamId", getSingleTeam);
router.patch("/:teamId", validateTeam, updateTeam);
router.delete("/:teamId", deleteTeam);
router.patch("/:teamId/avatar", updateTeamAvatar);
router.patch("/:teamId/photo", validateFileType, updateTeamPhoto);
router.delete("/:teamId/photo", removeTeamPhoto);
router.post("/:teamId/teammates", addUserToTeam);
router.patch("/:teamId/teammates", updateTeammateStatus);
router.delete("/:teamId/teammates", deleteTeammate);

module.exports = router;

const Team = require("../models/Team");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  deleteFileFromS3,
} = require("../utils/awsS3");

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

const createTeam = async (req, res, next) => {
  try {
    const { name, jobField, description, userId, avatar } = req.body;
    const teamObject = { name, jobField, description, avatar };
    const team = await Team.createTeam(teamObject, userId);
    await Team.addUserToTeam(userId, team.id, "owner");
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

const getSingleTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await Team.getSingleTeam(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

const addUserToTeam = async (req, res, next) => {
  const approvedStatuses = ["owner", "invited", "requested", "member"];
  try {
    const { teamId } = req.params;
    const { userId, status } = req.body;
    if (!approvedStatuses.includes(status)) {
      return res.status(401).json({ message: "Inavlid team member status." });
    }
    await Team.addUserToTeam(userId, teamId, status);
    res.status(201).json({
      message: `${
        status === "invited"
          ? "User successfully invited."
          : status === "requested"
          ? "Request successfully sent."
          : "Team accepted your request."
      }`,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeammateStatus = async (req, res, next) => {
  //TODO: CHECK IF CALLING USER HAS PRIVILEGES
  const approvedStatuses = ["owner", "admin", "member", "invited", "requested"];
  try {
    const { teamId } = req.params;
    const { userId, status } = req.body;
    if (!approvedStatuses.includes(status)) {
      return res.status(401).json({ message: "Inavlid team member status." });
    }
    const updatedTeammate = await Team.updateTeammateStatus(
      userId,
      teamId,
      status
    );
    if (!updatedTeammate) {
      return res.status(404).json({ message: "Teammate not found." });
    }
    res.status(200).json(updatedTeammate);
  } catch (error) {
    next(error);
  }
};

const deleteTeammate = async (req, res, next) => {
  //TODO: CHECK IF CALLING USER HAS PRIVILEGES
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const deletedTeammate = await Team.deleteTeammate(userId, teamId);
    if (!deletedTeammate) {
      return res.status(404).json({ message: "Teammate not found." });
    }
    res
      .status(200)
      .json({ message: "Teammate successfully removed from team." });
  } catch (error) {
    next(error);
  }
};

const updateTeam = async (req, res, next) => {
  //TODO: CHECK IF CALLING USER HAS PRIVILEGES
  try {
    const { userId, ...updates } = req.body;
    const { teamId } = req.params;

    const updatedTeam = Team.updateTeam(teamId, updates);
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found." });
    }
    return res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

const deleteTeam = async (req, res, next) => {
  //TODO: CHECK IF CALLING USER HAS PRIVILEGES
  try {
    const { teamId } = req.params;
    const deletedTeam = await Team.deleteTeam(teamId);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found." });
    }
    res.status(200).json({
      message: "Team successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};

const updateTeamAvatar = async (req, res, next) => {
  try {
    const { userId, ...updates } = req.body;
    const { teamId } = req.params;

    const { avatar } = await Team.updateTeam(teamId, updates);
    if (!avatar) {
      return res.status(404).json({ message: "Team not found." });
    }
    return res.status(200).json(avatar);
  } catch (error) {
    next(error);
  }
};

const updateTeamPhoto = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const upload = singleMulterUpload("photo");

    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Failed to upload photo." });
      }

      const photoUrl = await singlePublicFileUpload(req.file, true);

      const updates = { photo: photoUrl };
      const updatedTeam = await Team.updateTeam(teamId, updates);

      if (!updatedTeam) {
        return res.status(404).json({ message: "Team not found." });
      }

      res.status(200).json(updatedTeam);
    });
  } catch (error) {
    next(error);
  }
};

const removeTeamPhoto = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await Team.getSingleTeam(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    const { photo } = team;
    if (photo) {
      const filename = photo.split("/").pop();
      await deleteFileFromS3(filename, true);
    }

    const updates = { photo: null };
    const updatedTeam = await Team.updateTeam(teamId, updates);

    res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  addUserToTeam,
  createTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
  updateTeamAvatar,
  updateTeamPhoto,
  removeTeamPhoto,
};

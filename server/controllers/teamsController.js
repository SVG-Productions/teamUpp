const Team = require("../models/Team");

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
  try {
    const { teamId } = req.params;
    const { userId, status } = req.body;
    const addedTeamUser = await Team.addUserToTeam(userId, teamId, status);
    res.status(201).json(addedTeamUser);
  } catch (error) {
    next(error);
  }
};

const updateTeammateStatus = async (req, res, next) => {
  //TODO: CHECK IF CALLING USER HAS PRIVILEGES
  try {
    const { teamId } = req.params;
    const { userId, status } = req.body;
    const updatedTeammate = await Team.updateTeammateStatus(
      userId,
      teamId,
      status
    );
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
    res.status(200).json(deletedTeammate);
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
      return res.status(404).json({
        message: `Team with id ${teamId} not found.`,
      });
    }
    res.status(200).json({
      message: `Team with id ${teamId} has been deleted.`,
      deletedTeam,
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
    return res.status(200).json(avatar);
  } catch (error) {
    next(error);
  }
};

const updateTeamPhoto = async (req, res, next) => {
  return;
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
};

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
    const { name, jobField, description, userId } = req.body;
    const teamObject = { name, jobField, description };
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

const getAllTeammates = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teammates = await Team.getAllTeammates(teamId);
    res.status(200).json(teammates);
  } catch (error) {
    next(error);
  }
};

const getAllTeamListings = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teamListings = await Team.getAllTeamListings(teamId);

    res.status(200).json(teamListings);
  } catch (error) {
    next(error);
  }
};

const updateTeammateStatus = async (req, res, next) => {
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

module.exports = {
  getAllTeams,
  getSingleTeam,
  addUserToTeam,
  getAllTeammates,
  getAllTeamListings,
  createTeam,
  updateTeammateStatus,
};

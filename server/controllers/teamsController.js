const Team = require("../models/Team");

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.getAllTeams();
    if (teams.length === 0) {
      return res.status(200).json({ message: "No teams exist.", teams });
    }
    res.status(200).json({ message: "Teams fetched successfully.", teams });
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
    res.status(201).json({ message: "Team created succesfully.", team });
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
    res.status(200).json({ message: "Team fetched successfully.", team });
  } catch (error) {
    next(error);
  }
};

const addUserToTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const { status } = req.body;
    const addedTeamUser = await Team.addUserToTeam(userId, teamId, status);
    res
      .status(201)
      .json({ message: "User successfully added to team.", addedTeamUser });
  } catch (error) {
    next(error);
  }
};

const getAllTeammates = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teammates = await Team.getAllTeammates(teamId);
    if (!teammates) {
      return res.status(404).json({ message: "No teammates found." });
    }
    res
      .status(200)
      .json({ message: "Teammates fetched successfully.", teammates });
  } catch (error) {
    next(error);
  }
};

const getAllTeamListings = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teamListings = await Team.getAllTeamListings(teamId);
    if (teamListings.length === 0) {
      return res
        .status(200)
        .json({ message: "No team listings found.", teamListings });
    }
    res
      .status(200)
      .json({ message: "Team listings fetched successfully", teamListings });
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
};

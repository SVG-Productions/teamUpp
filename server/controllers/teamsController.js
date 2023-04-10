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

module.exports = {
  getAllTeams,
  getSingleTeam,
  getAllTeammates,
};

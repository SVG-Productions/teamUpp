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

module.exports = {
  getAllTeams,
};

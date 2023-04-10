const knex = require("../dbConfig");

const getAllTeams = async () => {
  try {
    const teams = await knex("teams").select("*");
    return teams;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSingleTeam = async (teamId) => {
  try {
    const team = await knex("teams").where("id", teamId).first();
    return team;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getAllTeammates = async (teamId) => {
  try {
    const teammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .join("teams", "users_teams.team_id", "teams.id")
      .whereIn(
        "user_id",
        knex("users_teams").select("user_id").where("team_id", teamId)
      )
      .select("users.username", "users.id")
      .distinct();
    console.log(teammates);
    return teammates;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  getAllTeammates,
};

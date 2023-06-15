const knex = require("../dbConfig");

const getAllTeams = async () => {
  try {
    const teams = await knex("teams")
      .select(
        "id",
        "name",
        "job_field",
        "description",
        "is_private",
        "avatar",
        "photo"
      )
      .count("* AS user_count")
      .join("users_teams", "teams.id", "users_teams.team_id")
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .groupBy("teams.id");
    return teams;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting all teams.");
  }
};

const createTeam = async (team) => {
  try {
    const [createdTeam] = await knex("teams")
      .insert(team)
      .returning(["id", "name", "jobField"]);
    return createdTeam;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error creating team.");
  }
};

const getSingleTeam = async (teamId) => {
  try {
    const team = await knex("teams").where("id", teamId).first();
    const allTeammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .whereIn(
        "user_id",
        knex("users_teams").select("user_id").where("team_id", teamId)
      )
      .where("team_id", teamId)
      .select("users.*", "status")
      .distinct();

    const teammates = allTeammates.filter(
      (tm) => tm.status !== "invited" && tm.status !== "requested"
    );
    const admins = allTeammates.filter(
      (tm) => tm.status === "owner" || tm.status === "admin"
    );
    const [owner] = admins.filter((a) => a.status === "owner");
    const invited = allTeammates.filter((tm) => tm.status === "invited");
    const requested = allTeammates.filter((tm) => tm.status === "requested");
    const listings = await knex("listings")
      .select("*")
      .where("team_id", teamId);
    return { ...team, teammates, invited, requested, listings, admins, owner };
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting team.");
  }
};

const addUserToTeam = async (userId, teamId, status) => {
  try {
    const [addedTeamUser] = await knex("users_teams")
      .insert({
        userId,
        teamId,
        status,
      })
      .returning(["userId", "teamId", "status"]);
    return addedTeamUser;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error adding user to team.");
  }
};

const updateTeammateStatus = async (userId, teamId, status) => {
  try {
    const [updatedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .update({ status })
      .returning("*");
    return updatedTeammate;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating teammate status.");
  }
};

const deleteTeammate = async (userId, teamId) => {
  try {
    const [deletedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .del()
      .returning("*");
    return deletedTeammate;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting teammate.");
  }
};

const updateTeam = async (teamId, updates) => {
  try {
    const [updatedTeam] = await knex("teams")
      .where("id", teamId)
      .update(updates)
      .returning("*");
    return updatedTeam;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating team.");
  }
};

const deleteTeam = async (teamId) => {
  try {
    const [deletedTeam] = await knex("teams")
      .where("id", teamId)
      .del()
      .returning("*");
    return deletedTeam;
  } catch (error) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting team.");
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  addUserToTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
};

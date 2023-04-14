const knex = require("../dbConfig");

const getAllTeams = async () => {
  try {
    const teams = await knex("teams").select("*");
    return teams;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const createTeam = async (team) => {
  try {
    const [createdTeam] = await knex("teams")
      .insert(team)
      .returning(["id", "name", "jobField"]);
    return createdTeam;
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

const addUserToTeam = async (userId, teamId, status) => {
  const approvedStatuses = ["owner", "invited", "requested"];
  try {
    if (!approvedStatuses.includes(status)) {
      throw new Error("Invalid status");
    }
    const [addedTeamUser] = await knex("users_teams")
      .insert({
        userId,
        teamId,
        status,
      })
      .returning(["userId", "teamId", "status"]);
    return addedTeamUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getAllTeammates = async (teamId) => {
  try {
    const teammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .whereIn(
        "user_id",
        knex("users_teams").select("user_id").where("team_id", teamId)
      )
      .where("team_id", teamId)
      .select("users.username", "users.id", "status")
      .distinct();
    return teammates;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getAllTeamListings = async (teamId) => {
  try {
    const teamListings = await knex("listings")
      .select("*")
      .where("team_id", teamId);
    return teamListings;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const updateTeammateStatus = async (userId, teamId, status) => {
  const approvedStatuses = ["owner", "admin", "member", "invited", "requested"];
  try {
    if (!approvedStatuses.includes(status)) {
      throw new Error("Invalid status");
    }
    const [updatedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .update({ status })
      .returning("*");
    return updatedTeammate;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteTeammate = async (userId, teamId) => {
  try {
    const [deletedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .del()
      .returning("*");
    if (!deletedTeammate) {
      throw new Error(
        `Teammate with id ${userId} for teamId ${teamId} does not exist`
      );
    }
    return deletedTeammate;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
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
    throw new Error("Database Error: " + error.message);
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
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  getAllTeammates,
  getAllTeamListings,
  createTeam,
  addUserToTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
};

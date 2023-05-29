const knex = require("../dbConfig");

const getAllTeams = async () => {
  try {
    const teams = await knex("teams")
      .select("id", "name", "job_field", "description", "is_private")
      .count("* AS user_count")
      .join("users_teams", "teams.id", "users_teams.team_id")
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .groupBy("teams.id");
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
    const allTeammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .whereIn(
        "user_id",
        knex("users_teams").select("user_id").where("team_id", teamId)
      )
      .where("team_id", teamId)
      .select(
        "users.username",
        "users.id",
        "users.avatar",
        "users.photo",
        "status"
      )
      .distinct();

    const teammates = allTeammates.filter(
      (tm) => tm.status !== "invited" && tm.status !== "requested"
    );
    const admins = allTeammates.filter(
      (tm) => tm.status === "owner" || tm.status === "admin"
    );
    const invited = allTeammates.filter((tm) => tm.status === "invited");
    const requested = allTeammates.filter((tm) => tm.status === "requested");
    const listings = await knex("listings")
      .select("*")
      .where("team_id", teamId);
    return { ...team, teammates, invited, requested, listings, admins };
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
  createTeam,
  addUserToTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
};

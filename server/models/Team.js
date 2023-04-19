const { selectFields } = require("express-validator/src/select-fields");
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

const getRecommendedTeams = async (userId) => {
  try {
    // Retrieve the list of teams that the user is currently a member of
    const userTeams = await knex("users_teams")
      .where("user_id", userId)
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.id", "teams.name", "teams.job_field", "teams.description");

    // Retrieve the list of users who are members of those teams, excluding the caller
    const teamUsers = await knex("users_teams")
      .whereIn(
        "team_id",
        userTeams.map((team) => team.id)
      )
      .join("users", "users_teams.user_id", "=", "users.id")
      .whereNot("users.id", userId)
      .select("users.id");

    // Retrieve the list of teams that those remaining users are members of
    const otherUserTeams = await knex("users_teams")
      .whereIn(
        "user_id",
        teamUsers.map((user) => user.id)
      )
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.id", "teams.name", "teams.job_field", "teams.description")
      .distinct();

    // Filter out any teams that the current user is already a member of
    const recommendedTeams = otherUserTeams.filter(
      (team) => !userTeams.find((userTeam) => userTeam.id === team.id)
    );

    // Retrieve the list of teams that have the same job field as the current user
    const userJobField = userTeams[0]?.job_field;
    if (userJobField) {
      const jobFieldTeams = await knex("teams")
        .where("job_field", userJobField)
        .andWhereNot(
          "id",
          userTeams.map((team) => team.id)
        )
        .select("id", "name", "job_field", "description");

      recommendedTeams.push(...jobFieldTeams);
    }

    return recommendedTeams;
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
  getRecommendedTeams,
  createTeam,
  addUserToTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
};

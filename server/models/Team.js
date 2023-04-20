const { selectFields } = require("express-validator/src/select-fields");
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
    const userTeams = (
      await knex("users_teams")
        .where("user_id", userId)
        .join("teams", "users_teams.team_id", "=", "teams.id")
        .select("teams.id")
    ).map((team) => team.id);

    // Retrieve the list of teams that those remaining users are members of
    const recommendedTeams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.id", "teams.name", "teams.job_field", "teams.description")
      .whereIn(
        // includes teams that are asssociated with all of user's teammates
        "user_id",
        knex("users_teams") // list of userIds that matches the following criteria ------------------------------}
          .join("users", "users_teams.user_id", "=", "users.id") //                                              }
          .select("users.id") //                                                                                 }
          .whereIn("team_id", userTeams) // only include userIds which are associated with the user's teams      }
      ) // ------------------------------------------------------------------------------------------------------}
      .whereNotIn("team_id", userTeams) // but excludes teams the user is already in
      .distinct();

    // Retrieve the list of teams that have the same job field as the current user
    //Below needs to be done a different way, let user select a job field on account creation or profile settings?

    // const userJobField = userTeams[0]?.job_field;
    // if (userJobField) {
    //   const jobFieldTeams = await knex("teams")
    //     .where("job_field", userJobField)
    //     .andWhereNot(
    //       "id",
    //       userTeams.map((team) => team.id)
    //     )
    //     .select("id", "name", "job_field", "description");

    //   recommendedTeams.push(...jobFieldTeams);
    // }
    // console.log(recommendedTeams, recommendedTeams.length);

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

import { Knex } from "knex";
import { TeamType, UserType } from "../types";

const { DatabaseError } = require("pg");
const knex = require("../dbConfig");

const getAllTeams = async (query: {
  page?: string;
  jobFields?: string[];
  sort?: string;
  search?: string;
}) => {
  const { page, jobFields, sort, search } = query;
  let sortKey, sortDirection;
  if (sort) {
    [sortKey, sortDirection] = sort.split(/(?=[A-Z])/);
  }

  try {
    const teamsQuery = knex("teams")
      .select(
        "id",
        "name",
        "job_field",
        "description",
        "is_private",
        "avatar",
        "photo"
      )
      .where((builder: Knex.QueryBuilder) => {
        if (jobFields && jobFields.length > 0) {
          builder.whereIn("job_field", jobFields);
        }
        if (search) {
          builder.whereILike("name", `%${search}%`);
        }
      });

    const [count] = await teamsQuery
      .clone()
      .clearSelect()
      .count("* AS total_count");

    teamsQuery
      .count("* AS user_count")
      .join("users_teams", "teams.id", "users_teams.team_id")
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .groupBy("teams.id")
      .offset(((Number(page) || 1) - 1) * 10)
      .limit(10)
      .orderBy(sortKey || "name", sortDirection || "Asc");

    const teams = await teamsQuery;
    const response = { teams, ...count };

    return response;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting all teams.");
  }
};

const createTeam = async (team: TeamType) => {
  try {
    const [createdTeam] = await knex("teams")
      .insert(team)
      .returning(["id", "name", "jobField"]);
    return createdTeam;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error creating team.");
  }
};

const getSingleTeam = async (
  teamId: string,
  query: { page?: string; sort?: string; search?: string }
) => {
  try {
    let sortKey: string | undefined,
      sortDirection: string | undefined,
      page: string | undefined,
      sort: string | undefined,
      search: string | undefined;
    if (query) {
      page = query.page;
      sort = query.sort;
      search = query.search;
    }
    if (sort) {
      [sortKey, sortDirection] = sort.split(/(?=[A-Z])/);
    }
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
      (tm: UserType) => tm.status !== "invited" && tm.status !== "requested"
    );
    const admins = allTeammates.filter(
      (tm: UserType) => tm.status === "owner" || tm.status === "admin"
    );
    const [owner] = admins.filter((a: UserType) => a.status === "owner");
    const invited = allTeammates.filter(
      (tm: UserType) => tm.status === "invited"
    );
    const requested = allTeammates.filter(
      (tm: UserType) => tm.status === "requested"
    );
    const listingsQuery = knex("listings")
      .select("*")
      .join("teams_listings", "listings.id", "teams_listings.listing_id")
      .where("team_id", teamId)
      .where((builder: Knex.QueryBuilder) => {
        if (search) builder.whereILike("jobTitle", `%${search}%`);
      });

    const [listingsCount] = await listingsQuery
      .clone()
      .clearSelect()
      .count("* AS total_count");

    listingsQuery
      .offset(((Number(page) || 1) - 1) * 10)
      .limit(10)
      .orderBy(sortKey || "created_at", sortDirection || "Asc");

    const listings = await listingsQuery;

    return {
      ...team,
      teammates,
      invited,
      requested,
      listings,
      ...listingsCount,
      admins,
      owner,
    };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting team.");
  }
};

const addUserToTeam = async (
  userId: string,
  teamId: string,
  status: string
) => {
  try {
    const isInTeam = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .select("*")
      .first();
    if (isInTeam) {
      const error: any = new Error(
        `${
          isInTeam.status === "invited"
            ? "User has already been invited."
            : isInTeam.status === "requested"
            ? "Request to join is pending."
            : "User is already in team."
        }`
      );
      error.status = 400;
      throw error;
    }
    const [addedTeamUser] = await knex("users_teams")
      .insert({
        userId,
        teamId,
        status,
      })
      .returning(["userId", "teamId", "status"]);
    return addedTeamUser;
  } catch (error: any) {
    if (error instanceof DatabaseError) {
      console.error("Database Error: " + error.message);
      throw new Error("Error adding user to team.");
    }
    throw error;
  }
};

const updateTeammateStatus = async (
  userId: string,
  teamId: string,
  status: string
) => {
  try {
    const [updatedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .update({ status })
      .returning("*");
    return updatedTeammate;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating teammate status.");
  }
};

const deleteTeammate = async (userId: string, teamId: string) => {
  try {
    const [deletedTeammate] = await knex("users_teams")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .del()
      .returning("*");
    return deletedTeammate;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting teammate.");
  }
};

const updateTeam = async (teamId: string, updates: TeamType) => {
  try {
    const [updatedTeam] = await knex("teams")
      .where("id", teamId)
      .update(updates)
      .returning("*");
    return updatedTeam;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating team.");
  }
};

const deleteTeam = async (teamId: string) => {
  try {
    const [deletedTeam] = await knex("teams")
      .where("id", teamId)
      .del()
      .returning("*");
    return deletedTeam;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting team.");
  }
};

const addApplicationToTeam = async (teamId: string, appId: string) => {
  try {
    const [sharedApp] = await knex("teams_listings")
      .insert({ teamId, listingId: appId })
      .returning("*");
    return sharedApp;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting team.");
  }
};

const removeApplicationFromTeam = async (teamId: string, appId: string) => {
  try {
    const [removedApp] = await knex("teams_listings")
      .where("team_id", teamId)
      .andWhere("listing_id", appId)
      .del()
      .returning("*");
    return removedApp;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting team.");
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  addUserToTeam,
  createTeam,
  updateTeammateStatus,
  deleteTeammate,
  updateTeam,
  deleteTeam,
  addApplicationToTeam,
  removeApplicationFromTeam,
};

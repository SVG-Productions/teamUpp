import { Knex } from "knex";
import { TeamType, UserType } from "../types";

const knex = require("../dbConfig");
const bcrypt = require("bcrypt");
const { DatabaseError } = require("pg");

const validatePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const loginUser = async (credential: string, password: string) => {
  try {
    const data = await knex("users")
      .select(
        "id",
        "username",
        "email",
        "hashed_password",
        "avatar",
        "photo",
        "theme",
        "account_status"
      )
      .where("username", credential)
      .orWhere("email", credential)
      .first();
    const { hashedPassword, ...user } = data;

    if (
      user &&
      hashedPassword &&
      (await validatePassword(password, hashedPassword))
    ) {
      return user;
    }
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error logging in user.");
  }
};

const createUser = async (user: UserType) => {
  try {
    const [createdUser] = await knex("users")
      .insert(user)
      .returning([
        "id",
        "username",
        "email",
        "avatar",
        "photo",
        "theme",
        "confirmation_code",
      ]);
    return createdUser;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error creating user.");
  }
};

const getSession = async (userId: string) => {
  try {
    const user = await knex("users")
      .select("id", "username", "email", "avatar", "photo", "theme")
      .where("id", userId)
      .first();
    return user;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting current session.");
  }
};

const getAllUsers = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting all users.");
  }
};

const getPublicUser = async (username: string) => {
  try {
    const data = await knex("users")
      .select("*")
      .where("username", username)
      .first();
    const { hashedPassword, isEmailPublic, email, ...user } = data;
    if (!data) return null;
    if (!isEmailPublic) {
      return { isEmailPublic, ...user };
    }
    return { isEmailPublic, email, ...user };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting public user.");
  }
};

const getSessionUser = async (userId: string) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashedPassword, ...user } = data;
    return user;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting current sessioned user.");
  }
};

const getUserFavorites = async (
  userId: string,
  query: { page?: string; sort?: string; search?: string }
) => {
  const { page, sort, search } = query;
  let sortKey, sortDirection;
  if (sort) {
    [sortKey, sortDirection] = sort.split(/(?=[A-Z])/);
  }

  try {
    const favoritesQuery = knex("listings")
      .join("users_favorites", "listings.id", "=", "users_favorites.listing_id")
      .join("users", "listings.user_id", "=", "users.id")
      .where("users_favorites.user_id", userId)
      .select(
        "listings.*",
        "users.username",
        "users.avatar",
        "users.photo",
        "users_favorites.team_id"
      )
      .where((builder: Knex.QueryBuilder) => {
        if (search) builder.whereILike("jobTitle", `%${search}%`);
      });

    const [count] = await favoritesQuery
      .clone()
      .clearSelect()
      .count("* AS total_count");

    favoritesQuery
      .offset(((Number(page) || 1) - 1) * 10)
      .limit(10)
      .orderBy(sortKey || "created_at", sortDirection || "Asc");

    const listings = await favoritesQuery;
    const response = { listings, ...count };

    return response;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user favorites.");
  }
};

const getUserSocials = async (userId: string) => {
  try {
    const socials = await knex("users_socials")
      .where("users_socials.user_id", userId)
      .select("social");
    const flattenedSocials = socials.map((s: { social: string }) => s.social);
    return flattenedSocials;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user socials.");
  }
};

const getUserTeams = async (userId: string) => {
  try {
    const teams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .where("users_teams.user_id", userId)
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .select("teams.*", "status");
    return teams;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("No user found");
  }
};

const getUserTeammates = async (userId: string) => {
  try {
    const teammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .join("teams", "users_teams.team_id", "teams.id")
      .whereIn(
        "team_id",
        knex("users_teams")
          .select("team_id")
          .where("user_id", userId)
          .whereNot("status", "invited")
          .whereNot("status", "requested")
      )
      .select("users.*")
      .whereNot("users.id", userId)
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .distinct();

    return teammates;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user teammates.");
  }
};

const getRecommendedTeams = async (userId: string) => {
  try {
    const userTeams = (
      await knex("users_teams")
        .where("user_id", userId)
        .join("teams", "users_teams.team_id", "=", "teams.id")
        .select("teams.id")
    ).map((team: TeamType) => team.id);

    const recommendedTeams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.*")
      .whereIn(
        "user_id",
        knex("users_teams")
          .join("users", "users_teams.user_id", "=", "users.id")
          .select("users.id")
          .whereIn("team_id", userTeams)
      )
      .whereNotIn("team_id", userTeams)
      .distinct();

    return recommendedTeams;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user recommended teams.");
  }
};

const deleteUser = async (userId: string) => {
  try {
    const [deletedUser] = await knex("users")
      .where("id", userId)
      .del()
      .returning("*");
    return deletedUser;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting user.");
  }
};

const updateUser = async (userId: string, updates: UserType) => {
  try {
    const { jobFields, socials, ...userUpdates } = updates;
    if (jobFields && jobFields.length > 3) {
      throw new Error("job_fields can not exceed length 3");
    }
    const [updatedUser] = await knex("users")
      .where("id", userId)
      .update(userUpdates)
      .returning("*");

    if (jobFields && jobFields.length) {
      await knex("users_job_fields").where("user_id", userId).del();
      jobFields.forEach(async (jobField) => {
        await knex("users_job_fields").insert({ userId, jobField });
      });
    }

    if (socials && socials.length) {
      await knex("users_socials").where("user_id", userId).del();
      socials.forEach(async (social) => {
        await knex("users_socials").insert({ userId, social });
      });
    }

    return { ...updatedUser, socials, jobFields };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating user.");
  }
};

const updatePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const saltRounds = 12;
  try {
    const { hashedPassword } = await knex("users")
      .select("hashed_password")
      .where("id", userId)
      .first();

    if (await validatePassword(oldPassword, hashedPassword)) {
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await knex("users")
        .where("id", userId)
        .update({ hashedPassword: newHashedPassword });
    } else {
      const error: any = new Error("Invalid password.");
      error.status = 400;
      throw error;
    }
  } catch (error: any) {
    if (error instanceof DatabaseError) {
      console.error(error.message);
      throw new Error("Error updating user password.");
    }
    throw error;
  }
};

const getRecentActivity = async (userId: string) => {
  try {
    const recentActivity = await knex.union([
      knex("comments as c")
        .select(
          "u.username as username",
          "u.avatar as avatar",
          "u.photo as photo",
          knex.raw("'comment' as content"),
          "l.id as content_id",
          "l.job_title as destination",
          "t.id as destination_id",
          "c.created_at as created_at",
          "c.id as query_id"
        )
        .innerJoin("users as u", "u.id", "=", "c.user_id")
        .innerJoin("listings as l", "l.id", "=", "c.listing_id")
        .innerJoin("teams_listings as tl", "tl.listing_id", "=", "l.id")
        .innerJoin("teams as t", "t.id", "=", "tl.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("c.user_id", userId),
      knex("listings as l")
        .select(
          "u.username as username",
          "u.avatar as avatar",
          "u.photo as photo",
          knex.raw("'listing' as content"),
          "l.id as content_id",
          "t.name as destination",
          "t.id as destination_id",
          "l.created_at as created_at",
          "u.id as query_id"
        )
        .innerJoin("users as u", "u.id", "=", "l.user_id")
        .innerJoin("teams_listings as tl", "tl.listing_id", "=", "l.id")
        .innerJoin("teams as t", "t.id", "=", "tl.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("l.user_id", userId),
      knex("experiences as e")
        .select(
          "u.username as username",
          "u.avatar as avatar",
          "u.photo as photo",
          knex.raw("'experience' as content"),
          "l.id as content_id",
          "l.job_title as destination",
          "t.id as destination_id",
          "e.created_at as created_at",
          "e.id as query_id"
        )
        .innerJoin("users as u", "u.id", "=", "e.user_id")
        .innerJoin("listings as l", "l.id", "=", "e.listing_id")
        .innerJoin("teams_listings as tl", "tl.listing_id", "=", "l.id")
        .innerJoin("teams as t", "t.id", "=", "tl.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("e.user_id", userId)
        .orderBy("created_at", "desc")
        .limit(10),
    ]);

    return recentActivity;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user recent activity.");
  }
};

const getUserJobFields = async (userId: string) => {
  try {
    const jobFields = await knex("users_job_fields")
      .where("user_id", userId)
      .select("job_field");
    const flattenedJobFields = jobFields.map(
      (jf: { jobField: string }) => jf.jobField
    );
    return flattenedJobFields;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user job fields.");
  }
};

const getTeamInvites = async (userId: string) => {
  try {
    const invites = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .where("users_teams.user_id", userId)
      .where("status", "invited")
      .select("teams.*", "status");
    return invites;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user team invites.");
  }
};

const getUserByConfirmationCode = async (confirmationCode: string) => {
  try {
    const user = await knex("users")
      .select("id")
      .where("confirmation_code", confirmationCode)
      .first();
    return user;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user by confirmation code.");
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await knex("users")
      .select(
        "id",
        "username",
        "email",
        "avatar",
        "photo",
        "theme",
        "account_status",
        "auth_type"
      )
      .where("email", email)
      .first();
    return user;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user by email.");
  }
};

const getUserListings = async (userId: string) => {
  try {
    const appStatuses = await knex("application_statuses")
      .select("app_status", "index")
      .where("user_id", userId);
    const listings = await knex("listings")
      .select("*")
      .where("user_id", userId);
    return { listings, appStatuses };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user listings.");
  }
};

module.exports = {
  validatePassword,
  createUser,
  getAllUsers,
  getPublicUser,
  getSessionUser,
  getUserFavorites,
  getUserSocials,
  getUserTeams,
  getUserTeammates,
  deleteUser,
  updateUser,
  updatePassword,
  loginUser,
  getSession,
  getRecommendedTeams,
  getRecentActivity,
  getUserJobFields,
  getTeamInvites,
  getUserByConfirmationCode,
  getUserByEmail,
  getUserListings,
};

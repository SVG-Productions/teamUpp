const knex = require("../dbConfig");
const bcrypt = require("bcrypt");

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const loginUser = async (credential, password) => {
  try {
    const data = await knex("users")
      .select("id", "username", "email", "hashed_password")
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
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const createUser = async (user) => {
  try {
    const [createdUser] = await knex("users")
      .insert(user)
      .returning(["id", "username", "email"]);
    return createdUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSession = async (userId) => {
  try {
    const user = await knex("users")
      .select("id", "username", "email", "avatar", "photo")
      .where("id", userId)
      .first();
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getPublicUser = async (username) => {
  try {
    const data = await knex("users")
      .select("*")
      .where("username", username)
      .first();
    const { hashedPassword, isEmailPublic, email, ...user } = data;
    if (!isEmailPublic) {
      return { isEmailPublic, ...user };
    }
    return { isEmailPublic, email, ...user };
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSessionUser = async (userId) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashedPassword, ...user } = data;
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserFavorites = async (userId) => {
  try {
    const favorites = await knex("listings")
      .join("users_favorites", "listings.id", "=", "users_favorites.listing_id")
      .where("users_favorites.user_id", userId)
      .select("listings.*");
    return favorites;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserTeams = async (userId) => {
  try {
    const teams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .where("users_teams.user_id", userId)
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .select("teams.*", "status");
    return teams;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserTeammates = async (userId) => {
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
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getRecommendedTeams = async (userId) => {
  try {
    const userTeams = (
      await knex("users_teams")
        .where("user_id", userId)
        .join("teams", "users_teams.team_id", "=", "teams.id")
        .select("teams.id")
    ).map((team) => team.id);

    const recommendedTeams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.id", "teams.name", "teams.job_field", "teams.description")
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
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [deletedUser] = await knex("users")
      .where("id", userId)
      .del()
      .returning("*");
    return deletedUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const updateUser = async (userId, updates) => {
  try {
    const { jobFields, ...userUpdates } = updates;
    if (jobFields.length > 3) {
      throw new Error("job_fields can not exceed length 3");
    }
    const [updatedUser] = await knex("users")
      .where("id", userId)
      .update(userUpdates)
      .returning("*");

    await knex("users_job_fields").where("user_id", userId).del();
    jobFields.forEach(async (jobField) => {
      await knex("users_job_fields").insert({ userId, jobField });
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const updatePassword = async (userId, oldPassword, newPassword) => {
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
      throw new Error("Invalid password.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRecentActivity = async (userId) => {
  try {
    const recentActivity = await knex.union([
      knex("comments as c")
        .select(
          "u.username as username",
          knex.raw("'comment' as content"),
          "l.id as content_id",
          "l.job_title as destination",
          "t.id as destination_id",
          "c.created_at as created_at"
        )
        .innerJoin("users as u", "u.id", "=", "c.user_id")
        .innerJoin("listings as l", "l.id", "=", "c.listing_id")
        .innerJoin("teams as t", "t.id", "=", "l.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("c.user_id", userId),
      knex("listings as l")
        .select(
          "u.username as username",
          knex.raw("'listing' as content"),
          "l.id as content_id",
          "t.name as destination",
          "t.id as destination_id",
          "l.created_at as created_at"
        )
        .innerJoin("users as u", "u.id", "=", "l.user_id")
        .innerJoin("teams as t", "t.id", "=", "l.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("l.user_id", userId),
      knex("experiences as e")
        .select(
          "u.username as username",
          knex.raw("'experience' as content"),
          "l.id as content_id",
          "l.job_title as destination",
          "t.id as destination_id",
          "e.created_at as created_at"
        )
        .innerJoin("users as u", "u.id", "=", "e.user_id")
        .innerJoin("listings as l", "l.id", "=", "e.listing_id")
        .innerJoin("teams as t", "t.id", "=", "l.team_id")
        .innerJoin("users_teams as ut", "ut.team_id", "=", "t.id")
        .where("ut.user_id", userId)
        .whereNot("e.user_id", userId)
        .orderBy("created_at", "desc")
        .limit(10),
    ]);

    return recentActivity;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserJobFields = async (userId) => {
  try {
    const jobFields = await knex("users_job_fields")
      .where("user_id", userId)
      .select("job_field");
    return jobFields;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getTeamInvites = async (userId) => {
  try {
    const invites = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .where("users_teams.user_id", userId)
      .where("status", "invited")
      .select("teams.*", "status");
    return invites;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  validatePassword,
  createUser,
  getAllUsers,
  getPublicUser,
  getSessionUser,
  getUserFavorites,
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
};

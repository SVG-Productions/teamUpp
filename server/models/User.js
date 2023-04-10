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

    if (user && (await validatePassword(password, hashedPassword))) {
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

const getSessionedUser = async (userId) => {
  try {
    const user = await knex("users")
      .select("id", "username", "email")
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

const getSingleUser = async (userId) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashedPassword, ...user } = data;
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSingleUserByUsername = async (username) => {
  try {
    const data = await knex("users")
      .select("*")
      .where("username", username)
      .first();
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
      .select("teams.*");
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
        knex("users_teams").select("team_id").where("user_id", userId)
      )
      .select("users.*")
      .whereNot("users.id", userId)
      .distinct();

    return teammates;
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
    const [updatedUser] = await knex("users")
      .where("id", userId)
      .update(updates)
      .returning("*");
    return updatedUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getIdByUsername = async (username) => {
  try {
    const [userId] = await knex("users")
      .select("id")
      .where("username", username);
    return userId;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
  getUserTeammates,
  deleteUser,
  updateUser,
  loginUser,
  getSingleUserByUsername,
  getSessionedUser,
  getIdByUsername,
};

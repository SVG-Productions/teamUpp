const knex = require("../dbConfig");

const createUser = async (user) => {
  try {
    const createdUser = await knex("users").insert(user).returning("*");
    return createdUser;
  } catch (error) {
    throw new Error("Error adding user to database.");
  }
};

const getAllUsers = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    throw new Error("Error fetching users from database.");
  }
};

const getSingleUser = async (userId) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashed_password, ...user } = data;
    return user;
  } catch (error) {
    throw new Error("Error fetching user from database.");
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
    throw new Error("Error fetching user favorites from database.");
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
    throw new Error("Error fetching user's teams from database.");
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUserFavorites,
  getUserTeams,
};

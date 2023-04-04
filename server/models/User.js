const knex = require("../dbConfig");

const getAllUsers = async () => {
  try {
    return await knex("users").select("*");
  } catch (error) {
    throw new Error("Error fetching from database.");
  }
};

module.exports = {
  getAllUsers,
};

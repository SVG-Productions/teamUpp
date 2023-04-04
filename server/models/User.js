const knex = require("../dbConfig");

const getAllUsers = async () => {
  try {
    return await knex("users").select("*");
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

module.exports = {
  getAllUsers,
  getSingleUser,
};

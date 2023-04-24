const knex = require("../dbConfig");

const getSingleExperience = async (experienceId) => {
  try {
    const experience = await knex("experiences")
      .join("users", "users.id", "experiences.userId")
      .select("experiences.*", "users.username as username")
      .where("experiences.id", experienceId)
      .first();
    return experience;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  getSingleExperience,
};

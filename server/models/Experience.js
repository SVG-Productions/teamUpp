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
    console.error("Database Error: " + error.message);
    throw new Error("Error getting the experience.");
  }
};

const createExperience = async (experience) => {
  try {
    const [createdExperience] = await knex("experiences")
      .insert(experience)
      .returning("*");
    return createdExperience;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error creating the experience.");
  }
};

const updateExperience = async (experienceId, updates) => {
  try {
    const [updatedExperience] = await knex("experiences")
      .where("id", experienceId)
      .update(updates)
      .returning("*");
    return updatedExperience;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error updating the experience.");
  }
};

const deleteExperience = async (experienceId) => {
  try {
    const [experience] = await knex("experiences")
      .where("id", experienceId)
      .del()
      .returning("id");
    return experience;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error deleting the experience.");
  }
};

const getExperienceQuestions = async (experienceId) => {
  try {
    const questions = await knex("experiences_questions")
      .where("experience_id", experienceId)
      .select("*");

    return questions;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error getting the experience questions.");
  }
};

const getExperienceLinks = async (experienceId) => {
  try {
    const links = await knex("experiences_links")
      .where("experience_id", experienceId)
      .select("*");

    return links;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error getting the experience links.");
  }
};

module.exports = {
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperienceQuestions,
  getExperienceLinks,
};

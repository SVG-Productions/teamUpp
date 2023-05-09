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

const createExperience = async (experience) => {
  try {
    const [createdExperience] = await knex("experiences")
      .insert(experience)
      .returning("*");
    return createdExperience;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
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
    throw new Error("Database Error:" + error.message);
  }
};

const deleteExperience = async (experienceId) => {
  try {
    const [experience] = await knex("experiences")
      .where("id", experienceId)
      .del()
      .returning("id");
    return experience;
  } catch {
    throw new Error("Database Error:" + error.message);
  }
};

const getExperienceQuestions = async (experienceId) => {
  try {
    const questions = await knex("experiences_questions")
      .where("experience_id", experienceId)
      .select("*");

    return questions;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const createExperienceQuestion = async (experienceId, question) => {
  try {
    const [createdQuestion] = await knex("experiences_questions")
      .insert({
        experienceId,
        question,
      })
      .returning("*");
    return createdQuestion;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const updateExperienceQuestion = async (questionId, update) => {
  try {
    const [updatedQuestion] = await knex("experiences_questions")
      .where("id", questionId)
      .update(update)
      .returning("*");
    return updatedQuestion;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

module.exports = {
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperienceQuestions,
  createExperienceQuestion,
  updateExperienceQuestion,
};

const knex = require("../dbConfig");

const addQuestion = async (question) => {
  try {
    const [createdQuestion] = await knex("experiences_questions")
      .insert(question)
      .returning("*");
    return createdQuestion;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const updateQuestion = async (questionId, updates) => {
  try {
    const [updatedQuestion] = await knex("experiences_questions")
      .where("id", questionId)
      .update(updates)
      .returning("*");
    return updatedQuestion;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const deleteQuestion = async (questionId) => {
  try {
    const [question] = await knex("experiences_questions")
      .where("id", questionId)
      .del()
      .returning("id");
    return question;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

module.exports = {
  addQuestion,
  deleteQuestion,
  updateQuestion,
};

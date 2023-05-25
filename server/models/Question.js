const knex = require("../dbConfig");

const addQuestions = async (questions) => {
  try {
    const createdQuestions = await knex("experiences_questions")
      .insert(questions)
      .returning("*");
    return createdQuestions;
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
  addQuestions,
  deleteQuestion,
  updateQuestion,
};

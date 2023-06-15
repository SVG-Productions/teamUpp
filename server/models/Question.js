const knex = require("../dbConfig");

const addQuestions = async (questions) => {
  try {
    const createdQuestions = await knex("experiences_questions")
      .insert(questions)
      .returning("*");
    return createdQuestions;
  } catch (error) {
    console.error("Database Error:" + error.message);
    throw new Error("Error creating experience question.");
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
    console.error("Database Error:" + error.message);
    throw new Error("Error updating experience question.");
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
    console.error("Database Error:" + error.message);
    throw new Error("Error deleting experience question.");
  }
};

module.exports = {
  addQuestions,
  deleteQuestion,
  updateQuestion,
};

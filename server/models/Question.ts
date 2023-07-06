import { QuestionType } from "../types";

const knex = require("../dbConfig");

const addQuestions = async (questions: QuestionType[]) => {
  try {
    const createdQuestions = await knex("experiences_questions")
      .insert(questions)
      .returning("*");
    return createdQuestions;
  } catch (error: any) {
    console.error("Database Error:" + error.message);
    throw new Error("Error creating experience question.");
  }
};

const updateQuestion = async (questionId: string, updates: QuestionType) => {
  try {
    const [updatedQuestion] = await knex("experiences_questions")
      .where("id", questionId)
      .update(updates)
      .returning("*");
    return updatedQuestion;
  } catch (error: any) {
    console.error("Database Error:" + error.message);
    throw new Error("Error updating experience question.");
  }
};

const deleteQuestion = async (questionId: string) => {
  try {
    const [question] = await knex("experiences_questions")
      .where("id", questionId)
      .del()
      .returning("id");
    return question;
  } catch (error: any) {
    console.error("Database Error:" + error.message);
    throw new Error("Error deleting experience question.");
  }
};

module.exports = {
  addQuestions,
  deleteQuestion,
  updateQuestion,
};

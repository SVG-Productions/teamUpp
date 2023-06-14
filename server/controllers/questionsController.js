const Question = require("../models/Question");

const addQuestion = async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error("Question content required.");
      error.status = 400;
      return next(error);
    }
    const question = await Question.addQuestions(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    if (!req.body) {
      const error = new Error("Question content required.");
      error.status = 400;
      return next(error);
    }
    const question = await Question.updateQuestion(questionId, req.body);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const deletedQuestion = await Question.deleteQuestion(questionId);
    if (!deletedQuestion) {
      const error = new Error("Question not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Question successfully deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addQuestion,
  deleteQuestion,
  updateQuestion,
};

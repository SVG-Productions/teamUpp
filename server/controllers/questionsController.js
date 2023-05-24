const Question = require("../models/Question");

const addQuestion = async (req, res, next) => {
  try {
    const question = await Question.addQuestions(req.body);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
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
    res.status(200).json({ message: "Question deleted.", deletedQuestion });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addQuestion,
  deleteQuestion,
  updateQuestion,
};

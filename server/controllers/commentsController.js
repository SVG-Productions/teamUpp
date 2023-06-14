const Comment = require("../models/Comment");

const addComment = async (req, res, next) => {
  try {
    const comment = await Comment.addComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.updateComment(commentId, req.body);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.deleteComment(commentId);
    if (!deletedComment) {
      const error = new Error("Comment does not exist");
      error.status = 400;
      return next(error);
    }
    res.status(200).json(deletedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
};

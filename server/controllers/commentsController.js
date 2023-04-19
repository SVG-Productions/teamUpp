const Comment = require("../models/Comment");

const getListingComments = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const comments = await Comment.getListingComments(listingId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const comment = await Comment.addComment(req.body);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.deleteComment(commentId);
    res.status(200).json({ message: "Comment deleted.", deletedComment });
  } catch (error) {
    next(error);
  }
};

module.exports = { getListingComments, addComment, deleteComment };

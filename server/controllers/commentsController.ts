import { NextFunction, Request, Response } from "express";

const Comment = require("../models/Comment");
const Listing = require("../models/Listing");

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await Comment.addComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.updateComment(commentId, req.body);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    res.status(200).json({ message: "Comment successfully deleted." });
  } catch (error) {
    next(error);
  }
};

const getListingComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listingId, teamId } = req.params;
    const comments = await Listing.getListingComments(listingId, teamId);
    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getListingComments,
};

export {};

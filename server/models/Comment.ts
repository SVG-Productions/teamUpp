import { CommentType } from "../types";

const knex = require("../dbConfig");

const addComment = async (comment: CommentType) => {
  try {
    const [addedComment] = await knex("comments")
      .insert(comment)
      .returning("*");
    const user = await knex("users")
      .select("username", "avatar", "photo")
      .where("id", addedComment.userId)
      .first();
    return { ...addedComment, ...user };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error adding the comment.");
  }
};

const updateComment = async (commentId: string, updates: CommentType) => {
  try {
    const [updatedComment] = await knex("comments")
      .where("id", commentId)
      .update(updates)
      .returning("*");
    const { username } = await knex("users")
      .select("users.username")
      .where("id", updatedComment.userId)
      .first();
    return { ...updatedComment, username };
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating the comment.");
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const [deletedComment] = await knex("comments")
      .where("id", commentId)
      .del()
      .returning("*");
    return deletedComment;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting the comment.");
  }
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
};

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

const getListingComments = async (listingId: string, teamId: string) => {
  try {
    const comments = await knex("comments")
      .join("users", "comments.userId", "=", "users.id")
      .select("comments.*", "username", "photo", "avatar")
      .where("listingId", listingId)
      .andWhere("teamId", teamId)
      .orderBy("createdAt", "desc");
    return comments;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting listing comments.");
  }
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getListingComments,
};

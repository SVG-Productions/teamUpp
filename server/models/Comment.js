const knex = require("../dbConfig");

const getListingComments = async (listingId) => {
  try {
    const comments = await knex("comments")
      .join("users", "comments.userId", "=", "users.id")
      .select("comments.*", "username")
      .where("listingId", listingId);
    return comments;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const addComment = async (comment) => {
  console.log("comment", comment);
  try {
    const addedComment = await knex("comments").insert(comment).returning("*");
    console.log("addedComment", addedComment);
    return addedComment;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const updateComment = async (commentId, updates) => {
  try {
    const [updatedComment] = await knex("comments")
      .where("id", commentId)
      .update(updates)
      .returning("*");
    return updatedComment;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteComment = async (commentId) => {
  try {
    const [deletedComment] = await knex("comments")
      .where("id", commentId)
      .del()
      .returning("*");
    return deletedComment;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  getListingComments,
  addComment,
  deleteComment,
  updateComment,
};

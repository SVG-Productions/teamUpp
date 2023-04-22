const knex = require("../dbConfig");

const addComment = async (comment) => {
  try {
    const [addedComment] = await knex("comments")
      .insert(comment)
      .returning("*");
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
  addComment,
  deleteComment,
  updateComment,
};

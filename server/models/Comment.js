const knex = require("../dbConfig");

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

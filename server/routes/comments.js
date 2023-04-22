const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentsController");

router.post("/", addComment);
router.delete("/:commentId", deleteComment);
router.patch("/:commentId", updateComment);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
  updateComment,
  getListingComments,
} = require("../controllers/commentsController");

router.post("/", addComment);
router.get("/listing/:listingId/team/:teamId", getListingComments);
router.delete("/:commentId", deleteComment);
router.patch("/:commentId", updateComment);

module.exports = router;
export {};

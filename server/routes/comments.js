const express = require("express");
const router = express.Router();
const {
  getListingComments,
  addComment,
  deleteComment,
} = require("../controllers/commentsController");

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["commentOne", "commentTwo", "commentThree"] });
});

router.post("/", addComment);
router.get("/:listingId", getListingComments);
router.delete("/:commentId", deleteComment);

module.exports = router;

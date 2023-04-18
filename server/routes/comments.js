const express = require("express");
const router = express.Router();
const { getListingComments } = require("../controllers/commentsController");

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["commentOne", "commentTwo", "commentThree"] });
});

router.get("/:listingId", getListingComments);

module.exports = router;

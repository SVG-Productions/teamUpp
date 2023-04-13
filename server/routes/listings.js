const express = require("express");
const router = express.Router();

/* GET listings. */
router.get("/", function (req, res, next) {
  res.json({ users: ["listingOne", "listingTwo", "listingThree"] });
});

module.exports = router;

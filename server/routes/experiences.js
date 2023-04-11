var express = require("express");
var router = express.Router();

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["experienceOne", "experienceTwo", "experienceThree"] });
});

module.exports = router;

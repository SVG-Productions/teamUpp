const express = require("express");
const router = express.Router();

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["experienceOne", "experienceTwo", "experienceThree"] });
});

module.exports = router;

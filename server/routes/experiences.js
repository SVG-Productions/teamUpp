const express = require("express");
const router = express.Router();

const {
  getSingleExperience,
  deleteExperience,
} = require("../controllers/experiencesController");

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["experienceOne", "experienceTwo", "experienceThree"] });
});
router.get("/:experienceId", getSingleExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;

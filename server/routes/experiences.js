const express = require("express");
const router = express.Router();

const {
  getSingleExperience,
  createExperience,
  deleteExperience,
} = require("../controllers/experiencesController");

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["experienceOne", "experienceTwo", "experienceThree"] });
});
router.post("/", createExperience);
router.get("/:experienceId", getSingleExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;

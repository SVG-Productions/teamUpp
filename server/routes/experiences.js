const express = require("express");
const router = express.Router();

const {
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experiencesController");

/* GET experiences. */
router.get("/", function (req, res, next) {
  res.json({ users: ["experienceOne", "experienceTwo", "experienceThree"] });
});
router.post("/", createExperience);
router.get("/:experienceId", getSingleExperience);
router.patch("/:experienceId", updateExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;

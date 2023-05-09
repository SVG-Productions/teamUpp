const express = require("express");
const router = express.Router();

const {
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experiencesController");
const { validateExperience } = require("../utils/validation");

router.post("/", validateExperience, createExperience);
router.get("/:experienceId", getSingleExperience);
router.patch("/:experienceId", updateExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createExperienceQuestion,
  updateExperienceQuestion,
  deleteExperienceQuestion,
} = require("../controllers/experiencesController");

router.post("/", createExperienceQuestion);
router.patch("/:questionId", updateExperienceQuestion);
router.delete("/:questionId", deleteExperienceQuestion);

module.exports = router;

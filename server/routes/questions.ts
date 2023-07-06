const express = require("express");
const router = express.Router();

const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");

router.post("/", addQuestion);
router.patch("/:questionId", updateQuestion);
router.delete("/:questionId", deleteQuestion);

module.exports = router;
export {};

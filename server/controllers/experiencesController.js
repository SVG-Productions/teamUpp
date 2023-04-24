const Experience = require("../models/Experience");

const getSingleExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.getSingleExperience(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found." });
    }
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSingleExperience,
};
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

const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.createExperience(req.body);
    res.status(201).json(experience);
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.deleteExperience(experienceId);
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
  createExperience,
  deleteExperience,
};

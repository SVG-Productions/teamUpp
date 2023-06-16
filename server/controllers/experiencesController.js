const Experience = require("../models/Experience");
const Link = require("../models/Link");
const Question = require("../models/Question");

const getSingleExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.getSingleExperience(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    experience.questions = await Experience.getExperienceQuestions(
      experienceId
    );
    experience.links = await Experience.getExperienceLinks(experienceId);
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const { links, questions, ...body } = req.body;
    const experience = await Experience.createExperience(body);
    if (links.length) {
      const updatedLinks = links.map((link) => {
        return { ...link, experienceId: experience.id };
      });
      await Link.addLinks(updatedLinks);
    }
    if (questions.length) {
      const updatedQuestions = questions.map((question) => {
        return { question, experienceId: experience.id };
      });
      await Question.addQuestions(updatedQuestions);
    }

    res.status(201).json(experience);
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.updateExperience(
      experienceId,
      req.body
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience successfully updated!" });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.deleteExperience(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience successfully deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSingleExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};

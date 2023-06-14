const Link = require("../models/Link");

const addLink = async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error("Link content required.");
      error.status = 400;
      return next(error);
    }
    const link = await Link.addLinks(req.body);
    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const deletedLink = await Link.deleteLink(linkId);
    if (!deletedLink) {
      const error = new Error("Link not found.");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Link successfully deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLink,
  deleteLink,
};

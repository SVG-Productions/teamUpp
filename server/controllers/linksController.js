const Link = require("../models/Link");

const addLink = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Link content required." });
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
      return res.status(404).json({ message: "Link not found" });
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

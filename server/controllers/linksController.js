const Link = require("../models/Link");

const addLink = async (req, res, next) => {
  try {
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
    res.status(200).json({ message: "Link deleted.", deletedLink });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLink,
  deleteLink,
};

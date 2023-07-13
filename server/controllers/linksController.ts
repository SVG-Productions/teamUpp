import { NextFunction, Request, Response } from "express";

const Link = require("../models/Link");

const addLink = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
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
export {};

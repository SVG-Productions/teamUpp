import { NextFunction, Request, Response } from "express";
const AppStatuses = require("../models/AppStatuses");

const updateUserAppStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
    const { statusOrder } = req.body;
    await AppStatuses.updateUserAppStatuses(id, statusOrder);
    res.status(200).json({ message: "App statuses successfully updated." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserAppStatuses,
};

export {};

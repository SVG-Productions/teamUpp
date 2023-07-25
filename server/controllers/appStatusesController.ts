import { NextFunction, Request, Response } from "express";
const AppStatus = require("../models/AppStatus");

const updateUserAppStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;
    const { statusOrder } = req.body;
    await AppStatus.updateUserAppStatuses(id, statusOrder);
    res.status(200).json({ message: "App statuses successfully updated." });
  } catch (error) {
    next(error);
  }
};

const addUserAppStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { newStatus } = req.body;
    const status = { ...newStatus, userId };
    await AppStatus.addUserAppStatus(status);
    res.status(200).json({ message: "App status successfully added." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserAppStatuses,
  addUserAppStatus,
};

export {};

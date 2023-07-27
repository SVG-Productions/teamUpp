import { NextFunction, Request, Response } from "express";
const AppStatus = require("../models/AppStatus");

const updateUserAppStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { statusOrder } = req.body;
    await AppStatus.updateUserAppStatuses(statusOrder);
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

const editUserAppStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { newStatus } = req.body;
    const { statusId } = req.params;
    await AppStatus.editUserAppStatus(userId, newStatus, statusId);
    res.status(200).json({ message: "App status successfully edited." });
  } catch (error) {
    next(error);
  }
};

const deleteUserAppStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { statusId } = req.body;
    await AppStatus.deleteUserAppStatus(statusId);
    res.status(202).json({ message: "App status successfully deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserAppStatuses,
  addUserAppStatus,
  editUserAppStatus,
  deleteUserAppStatus,
};

export {};

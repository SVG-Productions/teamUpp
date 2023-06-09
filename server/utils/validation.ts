import { NextFunction, Request, Response } from "express";

const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error: any) => `${error.msg}`);

    const err: any = Error("Bad request. Express validation error.");
    err.status = 400;
    err.errors = errors;
    return next(err);
  }
  next();
};

const validateSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.googleCredential) {
    return next();
  }
  const emailValidations = [
    check("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please provide a valid email."),
    check("username")
      .exists({ checkFalsy: true })
      .isLength({ min: 3, max: 30 })
      .withMessage(
        "Please provide a username with at least 3 characters but not longer than 30 characters."
      ),
    check("username")
      .not()
      .isEmail()
      .withMessage("Username cannot be an email."),
    check("password")
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters or more."),
  ];

  for (let validation of emailValidations) {
    await validation.run(req);
  }
  handleValidationErrors(req, res, next);
};

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.googleCredential) {
    return next();
  }
  const emailValidations = [
    check("credential")
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Please provide a valid email or username."),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password."),
  ];
  for (let validation of emailValidations) {
    await validation.run(req);
  }
  handleValidationErrors(req, res, next);
};

const validatePassword = [
  check("newPassword")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const validateUpdateUser = [
  check("firstName")
    .isLength({
      min: 0,
      max: 20,
    })
    .withMessage("First name must not exceed 20 characters."),
  check("lastName")
    .isLength({
      min: 0,
      max: 20,
    })
    .withMessage("Last name must not exceed 20 characters."),
  handleValidationErrors,
];

const validateTeam = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 25 })
    .withMessage(
      "Team name must be at least 4 characters and not exceed 20 characters."
    ),
  check("jobField")
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 25 })
    .withMessage(
      "Job field must be at least 4 characters and not exceed 20 characters."
    ),
  handleValidationErrors,
];

const validateListing = [
  check("jobTitle")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "Job title must be at least 3 characters and not exceed 40 characters."
    ),
  check("companyName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 40 })
    .withMessage(
      "Company name must be at least 1 character and not exceed 40 characters."
    ),
  handleValidationErrors,
];

const validateExperience = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 40 })
    .withMessage(
      "Experience title must be at least 5 characters and not exceed 40 characters."
    ),
  handleValidationErrors,
];

const validateFileType = [
  check("file").custom((value: any, { req }: { req: any }) => {
    if (!req.file) {
      throw new Error("Please upload a file");
    }

    const validExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      throw new Error("File must be a JPEG, JPG, or PNG.");
    }

    return true;
  }),
];

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateUser,
  validateTeam,
  validateListing,
  validateExperience,
  validatePassword,
  validateFileType,
};

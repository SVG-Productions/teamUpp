const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request. Express validation error.");
    err.status = 400;
    err.errors = errors;
    next(err);
  }
  next();
};

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Please provide a username with at least 3 characters but not longer than 20 characters."
    ),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
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

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateUser,
  validateTeam,
  validateListing,
  validateExperience,
};

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
  ,
  check("lastName")
    .isLength({
      min: 0,
      max: 20,
    })
    .withMessage("Last name must not exceed 20 characters."),
  ,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateUser,
};

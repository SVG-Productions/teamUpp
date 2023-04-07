const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = Error("Bad request. Express validation error.");
    err.status = 400;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};

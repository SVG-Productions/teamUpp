var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var csurf = require("@dr.pogodin/csurf");
var helmet = require("helmet");

var usersRouter = require("./routes/users");
var teamsRouter = require("./routes/teams");
var listingsRouter = require("./routes/listings");
var experiencesRouter = require("./routes/experiences");
const isProduction = process.env.DB_ENVIRONMENT === "production";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// route prefixing and useage of imported routers
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/experiences", experiencesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ status: err.status || 500, message: err.message });
});

module.exports = app;

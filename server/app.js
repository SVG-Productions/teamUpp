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
var sessionRouter = require("./routes/session");

var { restoreUser } = require("./utils/auth");

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

app.use(restoreUser);

// route prefixing and useage of imported routers
app.use("/api/session", sessionRouter);
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/experiences", experiencesRouter);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  app.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../client", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../client/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../client", "build", "index.html")
    );
  });
}

if (process.env.NODE_ENV !== "production") {
  app.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      "XSRF-Token": csrfToken,
    });
  });
}

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

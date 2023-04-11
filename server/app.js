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
var cors = require("cors");

var { restoreUser } = require("./utils/auth");

const isProduction = process.env.DB_ENVIRONMENT === "production";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors());
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
  console.log("in the serving thing");
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  app.get("/", (req, res) => {
    console.log("root route");
    console.log("path", path);
    console.log("dirname", __dirname);
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(path.join(__dirname, "views", "index.html"));
    return res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

  // Serve the static assets in the frontend's build folder
  // app.use(express.static(path.resolve("build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    console.log("not starting with api");
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(path.join(__dirname, "views", "index.html"));
    return res.sendFile(path.resolve(__dirname, "build", "index.html"));
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

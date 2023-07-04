import { NextFunction, Request, Response } from "express";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const csurf = require("@dr.pogodin/csurf");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./routes/users");
const teamsRouter = require("./routes/teams");
const listingsRouter = require("./routes/listings");
const experiencesRouter = require("./routes/experiences");
const commentsRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const questionsRouter = require("./routes/questions");
const linksRouter = require("./routes/links");

const { restoreUser } = require("./utils/auth");

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (!isProduction) {
  app.use(cors());
}
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

// application health check
app.get(
  "/api/healthcheck",
  (req: Request, res: Response, next: NextFunction) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    try {
      res.status(200).send(healthcheck);
    } catch (error: any) {
      healthcheck.message = error;
      res.status(503).send();
    }
  }
);

// route prefixing and useage of imported routers
app.use("/api/auth", restoreUser, authRouter);
app.use("/api/users", restoreUser, usersRouter);
app.use("/api/teams", restoreUser, teamsRouter);
app.use("/api/listings", restoreUser, listingsRouter);
app.use("/api/experiences", restoreUser, experiencesRouter);
app.use("/api/comments", restoreUser, commentsRouter);
app.use("/api/questions", restoreUser, questionsRouter);
app.use("/api/links", restoreUser, linksRouter);

if (process.env.NODE_ENV === "production") {
  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve(__dirname, "public")));

  // Serve the frontend's index.html file at all other routes NOT defined before conditional
  app.get("*", (req: Request, res: Response) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

if (process.env.NODE_ENV !== "production") {
  app.get("/api/csrf/restore", (req: Request, res: Response) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      "XSRF-Token": csrfToken,
    });
  });
}

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    ...err,
  });
});

module.exports = app;

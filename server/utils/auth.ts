import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const User = require("../models/User");

const setTokenCookie = (res: Response, user: any) => {
  if (jwtExpiresIn) {
    // Create the token.
    const token = jwt.sign(
      { data: user },
      jwtSecret,
      { expiresIn: parseInt(jwtExpiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie("token", token, {
      maxAge: Number(jwtExpiresIn) * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "lax",
    });

    return token;
  } else {
    throw new Error("JWT_EXPIRES_IN environment variable not defined.");
  }
};

const restoreUser = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(
    token,
    jwtSecret,
    null,
    async (err: any, jwtPayload: JwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.getSession(id);
      } catch (e) {
        res.clearCookie("token");
        return next();
      }

      if (!req.user) {
        res.clearCookie("token");
      }

      return next();
    }
  );
};

// If there is no current user, return an error
const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user) return next();

  const err: any = new Error("Authentication required");
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };

require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { setTokenCookie } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../utils/nodemailer.config");
const jwtSecret = process.env.JWT_SECRET;

const createUser = async (req, res, next) => {
  const saltRounds = 12;
  try {
    const { username, email, password, avatar } = req.body;
    const token = jwt.sign({ email }, jwtSecret);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userObject = {
      username,
      email,
      hashedPassword,
      avatar,
      confirmationCode: token,
    };
    const user = await User.createUser(userObject);
    const data = await sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    );
    res.send({
      message:
        "User was registered successfully. Please check your email to verify.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getPublicUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.getPublicUser(username);
    const teams = await User.getUserTeams(user.id);
    const teammates = await User.getUserTeammates(user.id);
    const jobFields = await User.getUserJobFields(user.id);
    const socials = await User.getUserSocials(user.id);

    res.status(200).json({ ...user, teams, teammates, jobFields, socials });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getPublicUser,
};

const bcrypt = require("bcrypt");

const userData = [
  {
    id: "cef0cbf3-6458-4f13-a418-ee4d7e7505da",
    username: "gochoa1088",
    email: "gochoa1088@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
  },
  {
    id: "bef0cbf3-6458-4f13-a418-ee4d7e7505da",
    username: "vochoa893",
    email: "vochoa893@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
  },
  {
    id: "aef0cbf3-6458-4f13-a418-ee4d7e7505da",
    username: "schaefferahn",
    email: "schaefferahn@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
  },
];

module.exports = userData;

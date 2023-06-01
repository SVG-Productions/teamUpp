const bcrypt = require("bcrypt");

const userData = [
  {
    id: "11111111-1111-1111-1111-000000000001",
    username: "gochoa1088",
    email: "gochoa1088@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar1.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000002",
    username: "vochoa893",
    email: "vochoa893@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar2.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000003",
    username: "schaefferahn",
    email: "schaefferahn@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar3.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000004",
    username: "jochoa69",
    email: "jochoa69@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar4.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000005",
    username: "someguy",
    email: "someguy@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar5.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000006",
    username: "hughmungus",
    email: "hughmungus@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar6.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000007",
    username: "johndoe",
    email: "johndoe@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar7.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000008",
    username: "janedoe",
    email: "janedoe@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar8.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000009",
    username: "elonsusk",
    email: "elonsusk@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar9.png",
  },
  {
    id: "11111111-1111-1111-1111-000000000010",
    username: "haxxorguy",
    email: "haxxorguy@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
  },
];

module.exports = userData;

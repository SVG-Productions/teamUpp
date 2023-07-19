const bcrypt = require("bcrypt");

const userData = [
  {
    id: "11111111-1111-1111-1111-000000000001",
    username: "gochoa1088",
    email: "gochoa1088@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar1.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000002",
    username: "vochoa893",
    email: "vochoa893@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar2.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000003",
    username: "schaefferahn",
    email: "schaefferahn@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar3.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000004",
    username: "jgarcia66",
    email: "jgarcia66@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar4.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000005",
    username: "guydutronc",
    email: "guydutronc@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar5.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000006",
    username: "hughhumphrey",
    email: "hughhumphrey@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar6.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000007",
    username: "johndoherty",
    email: "johndoherty@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar7.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000008",
    username: "janesmith",
    email: "janesmith@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar8.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000009",
    username: "jqzach",
    email: "jqzach@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar9.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000010",
    username: "haxxorguy",
    email: "haxxorguy@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000011",
    username: "samanthafriedrich",
    email: "samathafriedrich@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000012",
    username: "elenamarquez",
    email: "elenamarquez@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000013",
    username: "bogdansuceava",
    email: "bogdansuceava@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000014",
    username: "haroldkim",
    email: "haroldkim@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000015",
    username: "igaswiatek",
    email: "igaswiatek@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000016",
    username: "alicechang",
    email: "alicechangk@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
  {
    id: "11111111-1111-1111-1111-000000000017",
    username: "mallorywa",
    email: "mwallace@gmail.com",
    hashed_password: bcrypt.hashSync("password", 12),
    avatar: "/user/avatars/avatar10.png",
    account_status: "active",
    auth_type: "email",
  },
];

module.exports = userData;

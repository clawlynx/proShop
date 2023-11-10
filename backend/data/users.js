import { hashPassword } from "../utils/passwordutils.js";

const hashPass = await hashPassword("12345");

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: hashPass,
    isAdmin: true,
  },
  {
    name: "shafi",
    email: "shafi@gmail.com",
    password: hashPass,
    isAdmin: false,
  },
  {
    name: "claw",
    email: "claw@gmail.com",
    password: hashPass,
    isAdmin: false,
  },
];

export default users;

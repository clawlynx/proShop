import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordutils.js";
import { createJWT } from "../utils/tokenutils.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthenticatedError("invalid credentials");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  const token = createJWT({ userId: user._id });
  const days = 1000 * 60 * 60 * 24 * 30;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + days),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: await hashPassword(password),
  });
  const token = createJWT({ userId: user._id });
  const days = 1000 * 60 * 60 * 24 * 30;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + days),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError("No userfound");
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError("no user found");
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await hashPassword(req.body.password);
  await user.save();
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export const getAllUsers = async (req, res) => {
  res.send("get all users");
};

export const deleteUser = async (req, res) => {
  res.send("delete user");
};

export const getSingleUser = async (req, res) => {
  res.send("get single user");
};

export const updateSingleUser = async (req, res) => {
  res.send("update single user");
};

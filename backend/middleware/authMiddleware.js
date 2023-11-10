import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { verifyJWT } from "../utils/tokenutils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Unauthenticated. no cookie");
  try {
    const { userId } = verifyJWT(token);
    req.user = await User.findById(userId);
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};

export const checkForAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new UnauthorizedError("Not authorised. Admin only");
  }
};

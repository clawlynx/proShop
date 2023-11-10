import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateSingleUser,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  validateLoginInputs,
  validateRegisterInput,
  validateUpdateProfileInput,
} from "../middleware/validationMiddleware.js";
import {
  authenticateUser,
  checkForAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", validateRegisterInput, registerUser);
router.get("/", authenticateUser, checkForAdmin, getAllUsers);
router.post("/logout", logoutUser);
router.post("/login", validateLoginInputs, loginUser);
router.get("/profile", authenticateUser, getUserProfile);
router.put(
  "/profile",
  authenticateUser,
  validateUpdateProfileInput,
  updateUserProfile
);
router.delete("/:id", authenticateUser, checkForAdmin, deleteUser);
router.get("/:id", authenticateUser, checkForAdmin, getSingleUser);
router.put("/:id", authenticateUser, checkForAdmin, updateSingleUser);

export default router;

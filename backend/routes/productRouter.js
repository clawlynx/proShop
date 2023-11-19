import { Router } from "express";
import {
  createNewProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  getAllProducts,
  getSingleProduct,
  getTopRatedProducts,
} from "../controllers/productController.js";
import {
  validateEditProductInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";
import {
  authenticateUser,
  checkForAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/top", getTopRatedProducts);
router.get("/:id", validateIdParams, getSingleProduct);
router.post("/", authenticateUser, checkForAdmin, createNewProduct);
router.put(
  "/:id",
  authenticateUser,
  checkForAdmin,
  validateEditProductInput,
  editProduct
);
router.delete("/:id", authenticateUser, checkForAdmin, deleteProduct);
router.post("/:id/reviews", authenticateUser, createProductReview);

export default router;

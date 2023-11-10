import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { validateIdParams } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validateIdParams, getSingleProduct);

export default router;

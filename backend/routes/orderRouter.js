import { Router } from "express";
import {
  getAllMyOrders,
  getAllUsersOrders,
  getOrderById,
  placeOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import {
  authenticateUser,
  checkForAdmin,
} from "../middleware/authMiddleware.js";
import { validateOrderInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/", authenticateUser, validateOrderInput, placeOrder);
router.get("/", authenticateUser, checkForAdmin, getAllUsersOrders);
router.get("/myorders", authenticateUser, getAllMyOrders);
router.get("/:id", authenticateUser, getOrderById);
router.put("/:id/pay", authenticateUser, updateOrderToPaid);
router.put(
  "/:id/deliver",
  authenticateUser,
  checkForAdmin,
  updateOrderToDelivered
);

export default router;

import { NotFoundError } from "../errors/customErrors.js";
import Order from "../models/OrderModel.js";

export const placeOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x._id,
      _id: undefined,
    })),
    shippingAddress,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
    itemsPrice,
    user: req.user._id,
  });
  const newOrder = await order.save();
  res.status(201).json(newOrder);
};

export const getAllMyOrders = async (req, res) => {
  const allOrders = await Order.find({ user: req.user._id });
  if (!allOrders) throw new NotFoundError("no orders found for the user");
  res.status(200).json(allOrders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) throw new NotFoundError("No order found");
  res.status(200).json(order);
};

export const updateOrderToPaid = async (req, res) => {
  res.send("oredr paid");
};

export const updateOrderToDelivered = async (req, res) => {
  res.send("delivered");
};

export const getAllUsersOrders = async (req, res) => {
  res.send("all users orders");
};

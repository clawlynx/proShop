import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateIdParams = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid id");
    const product = await Product.findById(value);
    if (!product) throw new NotFoundError(`no product with id ${value}`);
  }),
]);

export const validateLoginInputs = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exists");
    }),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateProfileInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user._id.toString()) {
        console.log(user._id);
        console.log(req.user.userId);
        throw new BadRequestError("email already exists");
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateOrderInput = withValidationErrors([
  body("orderItems")
    .notEmpty()
    .withMessage("order items is required")
    .isArray()
    .withMessage("invalid orderItems format"),
  body("shippingAddress")
    .notEmpty()
    .withMessage("shipping Address required")
    .isObject()
    .withMessage("invalid shippingAddress format"),
  body("paymentMethod").notEmpty().withMessage("payment method required"),
  body("itemsPrice").notEmpty().withMessage("items price required"),
  body("taxPrice").notEmpty().withMessage("taxprice is required"),
  body("shippingPrice").notEmpty().withMessage("shipping price is required"),
  body("totalPrice").notEmpty().withMessage("total price requuired"),
]);

import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const pages = Math.ceil(count / pageSize);
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages });
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
};

export const createNewProduct = async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
};

export const editProduct = async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("no product found");
  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.description = description;
  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("no product found");
  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: "successfully deleted" });
};

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) throw new NotFoundError("No product found");
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) throw new UnauthenticatedError("Already reviwed");
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    product.reviews.length;
  await product.save();
  res.status(201).json({ message: "review added" });
};

export const getTopRatedProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: "-1" }).limit(3);
  res.status(200).json(products);
};

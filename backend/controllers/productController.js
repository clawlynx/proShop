import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
};

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Order from "./models/OrderModel.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";
import users from "./data/users.js";
import products from "./data/product.js";

await mongoose.connect(process.env.MONGODB_URI);

const createData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  createData();
}

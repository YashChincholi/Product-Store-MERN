import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./model/product.model.js";
import mongoose, { mongo } from "mongoose";

dotenv.config(); /* to load environment variable */

const app = express();

app.use(express.json()); /* middleware */

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: "not able fetching" });
    console.error("Error in getting: ", error.message);
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  }

  const newProduct = Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error occured", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating", error.message);
    res.status(500).json({ success: false, message: "Not updated" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Succesfully deleted" });
  } catch (error) {
    console.error("Error detected", error.message);
    res.status(400).json({ success: false, message: "error in deleting" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Listening at 5000 port hello how are you");
});

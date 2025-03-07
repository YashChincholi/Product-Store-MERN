import express from "express";
import mongoose from "mongoose";
import Product from "../model/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: "not able fetching" });
    console.error("Error in getting: ", error.message);
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Succesfully deleted" });
  } catch (error) {
    console.error("Error detected", error.message);
    res.status(400).json({ success: false, message: "error in deleting" });
  }
});

export default router;

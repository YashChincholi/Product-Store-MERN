import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./model/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); /* middleware */

app.get("/api/products", (req, res) => {
  res.send("Product is ready 123");
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
  console.log("Listening at 50000 port hello how are you");
});

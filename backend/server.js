import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./route/product.route.js";
dotenv.config(); /* to load environment variable */

const app = express();

app.use(express.json()); /* middleware */
const PORT = process.env.PORT || 5000;

app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log("Listening at 5000 port hello how are you");
});

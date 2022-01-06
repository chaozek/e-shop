import asyncHandler from "express-async-handler";
import cors from "cors";
import data from "./data.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://pavel:pavel@cluster0.z0ihn.mongodb.net/eshopsolo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("SERVER READY");
});
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening"));

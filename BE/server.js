import asyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRouter.js";
import path from "path";
import productRouter from "./routes/productRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("SERVER READY");
});
app.use("/uploads", uploadRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening"));

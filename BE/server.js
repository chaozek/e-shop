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
import logger from "morgan";

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.get("/api/", (req, res) => {
  res.send("SERVER READY");
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use(express.static(path.join(__dirname, "/FE/build")));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "/FE/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening"));

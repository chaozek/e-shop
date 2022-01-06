import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import data from "../data.js";
import express from "express";
const productRouter = express.Router();

productRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = req.body;
    if (data.orderItems.length <= 0) {
      res.status(400).send({ message: "Cart is Empty" });
      return;
    } else {
      try {
        const newOrder = new Order({
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.body.user,
        });
        const createdOrder = await newOrder.save();
        res.status(201).send({ message: "New Order Created", createdOrder });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server Error" });
      }
    }
  })
);
export default productRouter;

import { isAdmin, isAuth } from "../utils.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import data from "../data.js";
import express from "express";
const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req, res) => {
    if (req.body.orderItems.length <= 0) {
      res.status(400).send({ message: "Cart is Empty" });
      return;
    } else {
      try {
        console.log(req.body.paymentMethod, "TTTTTTTTTTTTTTT");
        const newOrder = new Order({
          shippingAddress: {
            city: req.body.shippingAddress.city,
            postal: req.body.shippingAddress.postal,
            address: req.body.shippingAddress.address,
            lastName: req.body.shippingAddress.lastName,
          },
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
          orderItems: req.body.orderItems,
        });
        const createdOrder = await newOrder.save();
        res.status(201).send({ message: "New Order Created", createdOrder });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Server Error" });
      }
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    try {
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: "Order Not Found" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);
orderRouter.post(
  "/list",
  isAuth,
  asyncHandler(async (req, res) => {
    console.log(req.body.id, "F");
    const orders = await Order.find({ user: req.body.id });
    console.log(orders);
    try {
      if (orders) {
        res.send(orders);
      } else {
        res.status(404).send({ message: "No Orders" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);
orderRouter.put(
  "/:id/pay",
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
export default orderRouter;

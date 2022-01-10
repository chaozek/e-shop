import { isAdmin, isAuth } from "../utils.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import data from "../data.js";
import express from "express";
const productRouter = express.Router();
productRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/create",
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    try {
      const createProduct = new Product({
        name: "sampleProduct4" + Date.now(),
        image: "images/p1.jpg",
        brand: "sample brand",
        category: "sample cat",
        description: "sample desc",
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
      });
      let newProduct = await createProduct.save();
      res.status(201).send({ message: "New Product Created", newProduct });
    } catch (error) {
      console.log(error);
    }
  })
);
productRouter.put(
  "/edit",
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const _id = req.body;
    console.log(req.body, "FAAAA");
    const product = await Product.findById(req.body.id.id);
    console.log(product);
    if (!product) {
      res.status(400).send({ message: "Cannot update product" });
    }
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.rating = req.body.rating;

    const updatedProduct = await product.save();

    res.send({
      message: "Product updated",
      product: updatedProduct,
    });
  })
);
export default productRouter;

import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import express from "express";
const orderRouter = express.Router();
orderRouter.post(
  "/signup",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send({ message: "user already in database" });
      return;
    }
    if (req.body.password !== req.body.password1) {
      res.status(400).send({ message: "Passwords doesnt match" });
      return;
    }
    const createUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    let newUser = await createUser.save();
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser),
    });
  })
);
export default orderRouter;

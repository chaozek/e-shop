import { generateToken } from "../utils.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import data from "../data.js";
import express from "express";
const userRouter = express.Router();

userRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    await User.insertMany(data.users);
    res.send(data.users);
  })
);
userRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "invalid pass or email" });
  })
);
userRouter.post(
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
export default userRouter;

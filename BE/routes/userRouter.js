import { generateToken, isAuth } from "../utils.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import data from "../data.js";
import express from "express";
const userRouter = express.Router();

userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);
userRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
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
userRouter.put(
  "/edit",
  isAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) {
      if (req.body.formValues.name.length > 0) {
        user.name = req.body.formValues.name;
      }
      if (req.body.formValues.email.length > 0) {
        user.email = req.body.formValues.email;
      }

      if (
        req.body.formValues.password.length > 0 &&
        req.body.formValues.password1.length > 0
      ) {
        if (req.body.formValues.password === req.body.formValues.password1) {
          user.password = bcrypt.hashSync(req.body.formValues.password, 8);
        } else {
          res.status(400).send({ message: "Passwords doesnt match" });
          return;
        }
        res.status(400).send({ message: "server error" });
      }

      const updatedUser = await user.save();
      res.send({
        message: "User updated",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        },
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
export default userRouter;

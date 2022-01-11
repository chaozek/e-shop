import { isAdmin, isAuth } from "../utils.js";
import express from "express";
import multer from "multer";
const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const upload = multer({ storage: storage });
uploadRouter.post("/", isAuth, upload.single("image"), function (req, res) {
  try {
    console.log(req.file.path);
    res.send(`${req.file.path}`);
  } catch (error) {
    console.log(error.message);
  }
});
export default uploadRouter;

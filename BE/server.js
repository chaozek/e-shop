import cors from "cors";
import data from "./data.js";
import express from "express";
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("SERVER READY");
});
app.get("/products", (req, res) => {
  try {
    res.send(data.products);
  } catch (error) {
    res.status(500).send({ error: "Server Error" });
  }
});
app.get("/product/:id", (req, res) => {
  const params = req.params.id;
  const product = data.products[params];
  try {
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: "Server Error" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening"));

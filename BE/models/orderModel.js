import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: { type: Array, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", OrderSchema);

export default Order;

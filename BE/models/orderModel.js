import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String },
        quantity: { type: Number },
        image: { type: String },
        price: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", OrderSchema);

export default Order;

import { PayPalButton } from "react-paypal-button-v2";
import { getOrder, payOrder } from "../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const OrderConfirm = (props) => {
  const order = useSelector((state) => state?.order.fetchedOrder);
  const orderPay = useSelector((state) => state?.orderPay.paidOrder);
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?._id || orderPay.successPay) {
      dispatch(getOrder(params.id));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order._id, order.isPaid, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return (
    <div className="mt-5">
      <p className="h2">ORDER {order._id}</p>

      <div className="row d-flex">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <strong>Name:</strong> {order.shippingAddress?.firstName}{" "}
                {order.shippingAddress?.lastName}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}, {order.shippingAddress?.postal}
              </p>
            </div>
            {order.isdelivered ? (
              <div className="alert alert-success" role="alert">
                DELIVERED
              </div>
            ) : (
              <div className="alert alert-danger m-3" role="alert">
                NOT DELIVERED
              </div>
            )}
          </div>
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <p className="card-text">
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
            </div>
            {order.isPaid ? (
              <div className="alert alert-success" role="alert">
                PAID
              </div>
            ) : (
              <div className="alert alert-danger m-3" role="alert">
                NOT PAID
              </div>
            )}
          </div>
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Order Items</h5>
              {order.orderItems?.map((cartItem, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center justify-content-between mt-5"
                >
                  <img
                    src={cartItem.image}
                    className="img-fluid"
                    alt={cartItem.name}
                    style={{ width: "80px" }}
                  />
                  <p>{cartItem.name}</p>

                  <p>
                    <strong> {cartItem.quantity}x</strong> ${cartItem.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 marginTop">
          {" "}
          <div className="card flex-shrink-1">
            <div className="card-body">
              <h5 className="card-title">Summary</h5>
              <div className=" d-flex justify-content-between">
                <strong> ITEMS PRICE</strong>
                <p>$ {order.itemsPrice}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> SHIPPING</strong>
                <p>$ {order.shippingPrice}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> TAX</strong>
                <p>$ {order.taxPrice}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> ORDER TOTAL</strong>
                <strong>
                  <p>$ {order.totalPrice}</p>
                </strong>
              </div>

              {!order.isPaid && (
                <li style={{ listStyle: "none", margin: "10px" }}>
                  {!sdkReady ? (
                    "loading"
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;

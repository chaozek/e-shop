import { createOrder } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Steps from "../../components/Steps";

const PlaceOrder = (props) => {
  const page = props.history.location.pathname.split("/")[1];
  const shipping = useSelector((state) => state.cart.shippingAddress);
  const cartList = useSelector((state) => state.cart.cartItems);
  const orderStatus = useSelector((state) => state.order.status);
  const order = useSelector((state) => state?.order?.order?.createdOrder?._id);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.cart.paymentMethod);
  const ship = useSelector((state) => state.cart);
  const pay = useSelector((state) => state.cart.paymentMethod);
  const cartPrice = cartList.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxes = Math.round(cartPrice * 0.21);
  const totalPrice = cartPrice + taxes + (cartPrice < 100 ? 10 : 0);
  const handleClick = () => {
    dispatch(
      createOrder({
        shippingAddress: { ...shipping },
        itemsPrice: cartPrice,
        taxPrice: taxes,
        totalPrice: totalPrice,
        shippingPrice: cartPrice < 100 ? 10 : 0,
        paymentMethod: cart.paymentMethod,
        orderItems: cart.cartItems,
      })
    );
  };
  console.log(cart.shippingAddress.address);
  useEffect(() => {
    if (!pay || !cart.shippingAddress.address) {
      console.log("F");
      props.history.push("/payment");
    }
  }, []);
  useEffect(() => {
    if (orderStatus === "success") {
      props.history.push("order/" + order);
    }
  }, [orderStatus]);
  console.log(JSON.parse(localStorage.getItem("userInfo")).token);
  return (
    <div className="mt-5">
      <Steps page={page} />
      <div className="row d-flex">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">Shipping</h5>
              <p className="card-text">
                <strong>Name:</strong> {shipping.firstName} {shipping.lastName}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {shipping.address}, {shipping.city},{" "}
                {shipping.postal}
              </p>
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <p className="card-text">
                <strong>Payment:</strong> {payment}
              </p>
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Order Items</h5>
              {cartList.map((cartItem, i) => (
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
                <p>$ {cartPrice}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> SHIPPING</strong>
                <p>$ {cartPrice < 100 ? "10" : "free"}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> TAX</strong>
                <p>$ {taxes}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <strong> ORDER TOTAL</strong>
                <strong>
                  <p>$ {cartPrice + taxes + (cartPrice < 100 ? 10 : 0)}</p>
                </strong>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 text-center w-100"
                onClick={() => handleClick()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

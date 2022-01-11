import { Link, useParams } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "../redux/cartSlice";
import { getproduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Cart = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const cartList = useSelector((state) => state.cart.cartItems);
  const userSignin = useSelector((state) => state.user.user);
  let loggedInOrLoggedOut = Object.keys(userSignin).length;

  const [qty, setQty] = useState(1);

  let sum = 0;
  const quantity = props.location.search.split("=")[1];
  const handleChangeQty = (props) => {
    const item = props[0];
    const quantity = Number(props[1]);
    dispatch(addProductToCart({ ...item, quantity }));
  };
  cartList.map((item) => (sum += item.price * item.quantity));

  if (cartList.length === 0) {
    return (
      <div style={{ minHeight: "50vh" }}>
        <div className="alert alert-primary mt-3" role="alert">
          You Cart Is Empty, <Link to="/">Go Shoping</Link>
        </div>
      </div>
    );
  }

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row m-5" style={{ minHeight: "50vh" }}>
      <div className="col-md-8">
        {cartList.map((cartItem, i) => (
          <div
            key={i}
            className="d-flex align-items-center justify-content-between "
          >
            <img
              src={cartItem.image}
              className="img-fluid"
              alt={cartItem.name}
              style={{ width: "80px" }}
            />
            <p>{cartItem.name}</p>
            <select
              className="form-select"
              aria-label="Default select example"
              value={cartItem.quantity}
              onChange={(e) => handleChangeQty([cartItem, e.target.value])}
              style={{ width: "70px" }}
            >
              {Array.from(Array(cartItem.countInStock).keys()).map((c) => (
                <option key={c} value={`${c + 1}`}>
                  {c + 1}
                </option>
              ))}
            </select>
            <p>${cartItem.price * cartItem.quantity}</p>
            <button
              type="button"
              className="btn btn-outline-danger btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => dispatch(removeProductFromCart(cartItem))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="col-md-4">
        {" "}
        <div className="card ">
          <div className="card-header">CART</div>
          <div className="card-body text-center">
            <div className="card-header d-flex justify-content-between p-0">
              <h5>SUBTOTAL ({cartList.length})</h5>
              <p>${sum}</p>
            </div>

            <a
              className="btn btn-primary mt-4 "
              onClick={() => checkoutHandler()}
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { addProductToCart } from "../redux/cartSlice";
import { getproduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Cart = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const cartList = useSelector((state) => state.cart.cartItems);
  const [qty, setQty] = useState(1);

  const quantity = props.location.search.split("=")[1];
  useEffect(() => {}, []);
  const handleChangeQty = (props) => {
    const item = props[0];
    const quantity = Number(props[1]);
    dispatch(addProductToCart({ ...item, quantity }));
  };
  return (
    <div className="row m-5">
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
          <div className="card-body">
            <div className="card-header d-flex justify-content-between p-0">
              <h5>SUBTOTAL ()</h5>
              <p>XXX</p>
            </div>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
          <div className="card-footer text-muted">2 days ago</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

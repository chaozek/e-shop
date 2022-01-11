import { setPaymentMethod } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import React, { useEffect } from "react";
import Steps from "../../components/Steps";

const Payment = (props) => {
  const page = props.history.location.pathname.split("/")[1];
  const cart = useSelector((state) => state.cart.shippingAddress);
  const ship = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [payment, setPayment] = useState("paypal");
  useEffect(() => {
    if (!cart.address) {
      props.history.push("/shipping");
    }
  }, [cart]);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(payment));
    props.history.push("/placeorder");
  };
  return (
    <div className="mt-5">
      <Steps page={page} />
      <div
        className=" d-flex align-items-center justify-content-center "
        style={{ height: "100%" }}
      >
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onChange={() => setPayment("paypal")}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Paypal
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onChange={() => setPayment("stripe")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Stripe
            </label>
          </div>
        </div>
      </div>
      <div className="row justify-content-center ">
        <button
          type="submit"
          className="btn btn-primary mt-3 text-center w-25"
          onClick={(e) => handleClick(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Payment;

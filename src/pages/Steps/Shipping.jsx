import { addShippingAddress } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Steps from "../../components/Steps";

const Shipping = (props) => {
  const page = props.history.location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.shippingAddress);
  let loggedInOrLoggedOut = Object.keys(userSignin).length;
  console.log(page);
  const [formValues, setFormValues] = useState({
    firstName: cart.firstName,
    lastName: cart.lastName,
    postal: cart.postal,
    address: cart.address,
    city: cart.city,
    info: cart.info,
    phone: cart.phone,
  });
  console.log(cart);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress(formValues));
    props.history.push("/payment");
  };

  useEffect(() => {
    if (!loggedInOrLoggedOut) {
      props.history.push("/");
    }
  }, [userSignin]);
  return (
    <div className="mt-5">
      <Steps page={page} />
      <div
        className=" d-flex align-items-center justify-content-center "
        style={{ height: "100%" }}
      >
        <form className=" md-w-50  shippingForm">
          <div className="input-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Firstname"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              name="firstName"
              value={formValues.firstName}
              onChange={(e) => handleChange(e)}
            />

            <input
              type="text"
              className="form-control "
              placeholder="Enter Surname"
              style={{ marginBottom: "5px" }}
              value={formValues.lastName}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter City"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              value={formValues.city}
              name="city"
              onChange={(e) => handleChange(e)}
            />

            <input
              type="number"
              className="form-control "
              placeholder="Enter Phone"
              style={{ marginBottom: "5px" }}
              value={formValues.phone}
              name="phone"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control "
              placeholder="Enter Postal Code"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              value={formValues.postal}
              name="postal"
              onChange={(e) => handleChange(e)}
            />

            <input
              type="text"
              className="form-control "
              placeholder="Enter Address"
              style={{ marginBottom: "5px" }}
              value={formValues.address}
              name="address"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter More Info"
              id="exampleFormControlTextarea1"
              value={formValues.info}
              name="info"
              rows="3"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={(e) => handleClick(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

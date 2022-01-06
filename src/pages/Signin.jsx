import { getUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
const Signin = (props) => {
  const error = useSelector((state) => state.user.error);
  const userSignin = useSelector((state) => state.user.user);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  let loggedInOrLoggedOut = Object.keys(userSignin).length;
  let redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getUser(formValues));
  };

  useEffect(() => {
    if (loggedInOrLoggedOut > 0) {
      props.history.push(redirect);
    }
  }, [userSignin]);

  return (
    <>
      {error && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
      <div className="mt-5 text-center">
        <h1 className="mb-3">Login</h1>
      </div>
      <div
        className=" d-flex align-items-center justify-content-center "
        style={{ height: "300px" }}
      >
        <form className=" w-50 ">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
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
    </>
  );
};

export default Signin;

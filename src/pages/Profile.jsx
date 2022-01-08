import {
  editUser,
  fetchUserInfo,
  getUser,
  signupUser,
} from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
const Profile = (props) => {
  const error = useSelector((state) => state.user.error);
  const userSignin = useSelector((state) => state.user.user);
  const user = useSelector((state) => state.user.userInfo);
  const userId = user._id;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(editUser({ formValues, userId }));
    setFormValues({
      name: user.name,
      email: user.email,
      password: "",
      password1: "",
    });
  };
  useEffect(() => {
    dispatch(fetchUserInfo(userSignin._id));
  }, [userSignin]);
  useEffect(() => {
    if (user?._id?.length > 0) {
      setFormValues({
        name: user.name,
        email: user.email,
        password: "",
        password1: "",
      });
    }
  }, [userSignin, user]);

  return (
    <>
      {error && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
      <div className="mt-5 text-center">
        <h1 className="mb-3">PROFILE</h1>
      </div>
      <div
        className=" d-flex align-items-center justify-content-center "
        style={{ height: "300px" }}
      >
        <form className=" w-50 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={formValues.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={formValues.email}
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
              value={formValues.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password1"
              value={formValues.password1}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={(e) => handleClick(e)}
          >
            UPDATE PROFILE
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;

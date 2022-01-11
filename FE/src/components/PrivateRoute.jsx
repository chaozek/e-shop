import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userSignin = useSelector((state) => state.user.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        userSignin?.token?.length > 0 ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;

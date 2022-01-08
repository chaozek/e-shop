import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { removeAllProducts } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
const Header = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllProducts());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <Link className="navbar-brand mt-2 mt-lg-0 " to="/">
            <h5 className="d-flex justify-content-center align-items-center m-0">
              e-shop
            </h5>
          </Link>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Projects
              </a>
            </li>
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Icon */}
          <Link className="text-reset me-3" to="/cart">
            <i className="fas fa-shopping-cart" />
            <span className="badge rounded-pill badge-notification bg-danger">
              {cart?.length > 0 ? cart?.length : ""}
            </span>
          </Link>
          {/* Notifications */}
          {/* Avatar */}
          {user.email ? (
            <>
              {" "}
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height={25}
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orderhistory" className="dropdown-item">
                    Orders
                  </Link>
                </li>

                <li>
                  <a className="dropdown-item" onClick={(e) => handleLogout(e)}>
                    Logout
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <Link className="nav-link" style={{ color: "gray" }} to="/signin">
              Login
            </Link>
          )}
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
};

export default Header;

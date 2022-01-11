import { Link } from "react-router-dom";
import { getOrders } from "../redux/orderSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const OrderHistory = () => {
  const userSignin = JSON.parse(localStorage.getItem("userInfo"));
  const orders = useSelector((state) => state.order.userOrders);

  console.log(orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(userSignin._id));
  }, []);
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">DATE</th>
          <th scope="col">TOTAL</th>
          <th scope="col">PAIED</th>
          <th scope="col">DELIVERED</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <th scope="row">{order._id}</th>
            <td>{order.createdAt}</td>
            <td>{order.totalPrice} $</td>
            <td>{order.isPaid ? "YES" : "NO"}</td>
            <td>{order.isDelivered ? "YES" : "NO"}</td>
            <td>
              {" "}
              <Link
                to={`order/${order._id}`}
                type="submit"
                className="btn btn-primary"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderHistory;

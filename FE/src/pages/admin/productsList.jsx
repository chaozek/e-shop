import { Link } from "react-router-dom";
import { araseNewArray, createProduct } from "../../redux/newProductSlice";
import { getOrders } from "../../redux/orderSlice";
import { getProducts, removeProductFromArray } from "../../redux/productsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const productsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const newProduct = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    if (newProduct?.status === "success") {
      //  props.history.push(`/product/${newProduct.product.newProduct._id}/edit`);
      //   dispatch(araseNewArray());
    }
    dispatch(getProducts());
  }, [dispatch, newProduct, props.history, araseNewArray]);
  const handleClick = () => {
    dispatch(createProduct());
  };
  const handleDelete = (id) => {
    var answer = window.confirm("Are You Sure To Delete?");
    if (answer) {
      dispatch(removeProductFromArray(id));
    } else {
      return;
    }
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-warning mt-5"
          onClick={(e) => handleClick(e)}
        >
          Create Product
        </button>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">DATE</th>
            <th scope="col">PRICE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">DELIVERED</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <th scope="row">{product.name}</th>
              <td>{product.createdAt}</td>
              <td>{product.price} $</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td className="d-flex justify-content-between">
                {" "}
                <Link
                  to={`product/${product._id}/edit`}
                  type="submit"
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                &nbsp;
                <button
                  type="submit"
                  className="btn btn-primary "
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default productsList;

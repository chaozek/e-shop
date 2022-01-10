import { Link, useParams } from "react-router-dom";
import { createProduct } from "../../redux/newProductSlice";
import { editProductFun, getProducts } from "../../redux/productsSlice";
import { getOrders } from "../../redux/orderSlice";
import { getproduct, setProduct } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";

const editProduct = (props) => {
  const product = useSelector((state) => state.product.product);
  const products = useSelector((state) => state.product.products);
  const newProduct = useSelector((state) => state.newProduct);
  const userSignin = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.product.error);
  const message = useSelector((state) => state.products.message);
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    brand: "",
    rating: 0,
    countInStock: 0,
    description: "",
  });
  const params = useParams();
  console.log(newProduct.product);
  const id = params;
  useEffect(() => {
    dispatch(getProducts());

    dispatch(getproduct(params.id));
    setFormValues({
      name: product.name,
      price: product.price,
      image: uploadedImage,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      countInStock: product.countInStock,
      description: product.description,
    });
  }, [userSignin, newProduct, product._id, props.history, products]);
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(setProduct(newProduct.product));
  }, [dispatch, newProduct]);
  const handleClick = (e) => {
    e.preventDefault();
    console.log({ ...formValues, image: uploadedImage }, "FFFFFFASSS");
    dispatch(editProductFun({ ...formValues, image: uploadedImage, id }));
    props.history.push("/productslist");
    /*  setFormValues({
      name: "",
      price: "",
      image: "",
      category: "",
      brand: "",
      count: "",
    }); */
  };
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/uploads",
        bodyFormData,
        {
          headers: { "content-type": "multipart/form-data" },
          authorization: `Bearer ${userSignin.token}`,
        }
      );
      setUploadedImage(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {message && (
        <div className="alert alert-success mt-5" role="alert">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
      <div className="mt-3 text-center">
        <h1 className="mb-5">Edit Product</h1>
      </div>
      <div
        className=" d-flex align-items-center justify-content-center "
        style={{ height: "500px" }}
      >
        <form className=" w-50 ">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={formValues.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="price"
              name="price"
              value={formValues.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Image</label>

            <div className="input-group ">
              <input
                type="file"
                className="form-control"
                onChange={(e) => uploadFile(e)}
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Category</label>
            <input
              type="text"
              className="form-control"
              placeholder="category"
              name="category"
              value={formValues.category}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              placeholder="brand"
              value={formValues.brand}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Count in Stock</label>
            <input
              type="text"
              className="form-control"
              name="countInStock"
              value={formValues.countInStock}
              placeholder="countInStock"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">rating</label>
            <input
              type="text"
              className="form-control"
              name="rating"
              value={formValues.rating}
              placeholder="rating"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formValues.description}
              placeholder="description"
              onChange={(e) => handleChange(e)}
            />
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

export default editProduct;

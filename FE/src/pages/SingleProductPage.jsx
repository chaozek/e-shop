import { Link, useHistory } from "react-router-dom";
import { addProductToCart } from "../redux/cartSlice";
import { getproduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "../components/Rating";
import React from "react";
const SingleProductPage = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const id = params.id;
  const product = useSelector((state) => state.product.product);
  const [quantity, setQuantity] = useState(1);
  const [finalImage, setFinalImage] = useState("");
  useEffect(() => {
    dispatch(getproduct(id));

    return () => {
      setFinalImage("");
    };
  }, []);
  useEffect(() => {
    if (product?.image?.includes("\\")) {
      setFinalImage("/" + "uploads" + "/" + product?.image?.split("\\")[1]);
    } else {
      setFinalImage(product?.image);
    }
  }, [product]);
  const handleCart = () => {
    dispatch(addProductToCart({ ...product, quantity }));
    history.push(`/cart/${id}?qty=${quantity}`);
  };
  const uploadedImage = "/" + "uploads" + "/" + product?.image?.split("\\")[1];
  return (
    <div className="container  ">
      <div className="row mt-5 mb-5">
        <div className="col-lg ">
          <img src={finalImage} className="img-fluid" alt="Wild Landscape" />
        </div>
        <div className="col-md">
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">{product.name}</h1>
            <Rating rating={product.rating} />
            <p>{product.numReviews} reviews</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="col-md">
          <div className="card border border-light shadow-0 ">
            <div className="card-header d-flex justify-content-between">
              <h5>PRICE</h5>
              <p>${product.price}</p>
            </div>
            <div className="card-body">
              <div className="card-title  d-flex justify-content-between">
                <h5>STATUS</h5>
                {product.countInStock > 0 ? (
                  <p style={{ color: "green" }}>In Stock</p>
                ) : (
                  <p style={{ color: "red" }}>No In Stock</p>
                )}
              </div>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the cars content.
              </p>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              {product.countInStock > 0 && (
                <>
                  {" "}
                  <div className="col-4 d-flex align-items-center">
                    <p style={{ margin: 0 }}>Quantity</p>
                  </div>
                  <div className="col-3">
                    {" "}
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    >
                      {Array.from(Array(product.countInStock).keys()).map(
                        (c) => (
                          <option key={c} value={`${c + 1}`}>
                            {c + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </>
              )}
            </div>
            <a
              className={`btn btn-primary ${
                product.countInStock === 0 && "disabled"
              }`}
              role="button"
              onClick={() => handleCart()}
              disabled={true}
            >
              ADD TO CART
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

import { Button, Card, Col, Row } from "react-bootstrap";
import { Container } from "../App";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
const ItemList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container fluid className="mt-2">
      <Row>
        {products?.map((product) => (
          <Col xs={12} md={4} xl={3} className="mt-4" key={product._id}>
            <div className="card-deck">
              <div className="card">
                <img
                  className="card-img-top"
                  style={{ height: "300px", width: "100%", objectFit: "cover" }}
                  src={product.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <h2>{product.price} $</h2>
                  <Link
                    to={`product/${product._id}`}
                    type="submit"
                    className="btn btn-primary  w-100"
                  >
                    GET IT
                  </Link>{" "}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;

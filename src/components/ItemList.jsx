import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
        {products?.map((product, i) => (
          <Col xs={12} md={4} xl={3} className="mt-4" key={product.name}>
            <Card className=" m-2">
              <Card.Img variant="top" src={product.image} />
              <h5 className="card-header mt-3">{product.name}</h5>
              <Card.Body>
                <Card.Text>{product.description}</Card.Text>
                <Card.Title>{product.price} Kč</Card.Title>
                <Link to={`product/${i}`}>
                  <Button variant="primary mt-4">Get it now</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;

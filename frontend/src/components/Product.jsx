import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`} className="overflow-y-hidden">
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as={"div"} className="product-title">
            <strong className="text-black ">{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as={"div"}>
          <Ratings
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as={"h3"}>Rs. {product.price}/-</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

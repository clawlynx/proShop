import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loading from "./Loading";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant={danger}>{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-secondary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} Rs.{product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;

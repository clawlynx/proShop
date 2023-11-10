import React from "react";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}{" "}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
}

export default HomePage;

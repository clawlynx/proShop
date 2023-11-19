import React from "react";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomePage() {
  const { pageNumber, keyword } = useParams();
  console.log(pageNumber);
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-secondary mb-3">
          Go back
        </Link>
      )}
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
            {data.products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : null}
          />
        </>
      )}
    </>
  );
}

export default HomePage;

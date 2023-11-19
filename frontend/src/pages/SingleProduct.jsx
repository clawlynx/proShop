import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Ratings from "../components/Ratings";
import {
  useCreateReviewMutation,
  useGetSingleProductQuery,
} from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Meta from "../components/Meta";

function SingleProduct() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetSingleProductQuery(id);
  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({
        productId: id,
        rating,
        comment,
      }).unwrap();
      toast.success("Review added");
      refetch();
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error?.data?.msg);
      setComment("");
      setRating(0);
    }
  };

  return (
    <>
      <Link to={"/"} className="btn btn-secondary my-3">
        Go Back
      </Link>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}{" "}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Ratings
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>price: {product?.price}/-</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as={"select"}
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant={"info"}>No reviews to show</Message>
              )}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {loadingReview && <Loading />}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as={"select"}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value={""}>Select....</option>
                          <option value={1}>1- Poor</option>
                          <option value={2}>2- Fair</option>
                          <option value={3}>3- Good</option>
                          <option value={4}>4- Very Good</option>
                          <option value={5}>5- Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as={"textarea"}
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loadingReview}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant={"info"}>
                      Please <Link to={"/login"}>signin</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default SingleProduct;

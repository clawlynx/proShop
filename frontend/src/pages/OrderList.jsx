import React from "react";
import { useGetAllUsersOrderQuery } from "../slices/orderApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

function OrderList() {
  const { data: orders, isLoading, error } = useGetAllUsersOrderQuery();
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((x) => {
              return (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.user?.name}</td>
                  <td>{x.createdAt.substring(0, 10)}</td>
                  <td>{x.totalPrice}</td>
                  <td>
                    {x.isPaid ? (
                      x.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {x.isDelivered ? (
                      x.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${x._id}`}>
                      <Button className="btn-sm" variant="secondary">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderList;

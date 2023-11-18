import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlkey } = useParams();
  const [keyword, setKeyword] = useState(urlkey || "");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={searchHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        search
      </Button>
    </Form>
  );
}

export default SearchBox;

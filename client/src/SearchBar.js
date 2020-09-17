import React, { useState } from "react";
import axios from "axios";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const searchBarContainerCss = css`
  padding: 30px;
  width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputSearchCss = css`
  width: 100%;
  outline: none;
  border: none;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  border-radius: 22px;
  box-sizing: border-box;
  font-size: 16px;
  height: 44px;
  padding: 0 32px;
  margin: 32px 0;
`;

const addButtonCss = css``;

export const SearchBar = (props) => {
  const [title, setTitle] = useState("");

  let url =
    process.env.NODE_ENV === "production"
      ? "https://booklopedia.herokuapp.com"
      : "http://localhost:5000";

  const handleChange = (evt) => {
    const { value } = evt.target;
    setTitle(value);
  };

  const handleClick = () => {
    addNewBook();
  };

  const addNewBook = async () => {
    if (title) {
      const book = {
        title,
        category: "Horror",
        authors: ["Carl Hand"],
      };
      const response = await axios.post(`${url}/book`, { book });
      props.onBookAdded(response.data);
    }
  };

  return (
    <div css={searchBarContainerCss}>
      <input css={inputSearchCss} onChange={handleChange} />
      <button css={addButtonCss} onClick={handleClick}>
        Add Book
      </button>
    </div>
  );
};

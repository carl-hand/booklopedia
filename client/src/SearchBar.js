import React, { useState } from "react";
import axios from "axios";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { url } from "./constants";
import dotenv from "dotenv";

dotenv.config();

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
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchTerm(value);
  };

  const handleClick = () => {
    if (searchTerm) {
      const newBook = search();
      if (newBook) {
        addNewBook(newBook);
      }
    }
  };

  const search = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=1&key=${process.env.API_KEY}`
    );
    const data = response.data;
    const books = data.items;
    if (books) {
      const foundBook = books[0];
      const title = foundBook?.volumeInfo?.title;
      const authors = foundBook?.volumeInfo?.authors;
      const description = foundBook?.volumeInfo?.description;
      const category = foundBook?.volumeInfo?.categories?.[0];
      const newBook = {
        title,
        authors,
        description,
        category,
      };
      return newBook;
    }
  };

  const addNewBook = async (book) => {
    if (book) {
      props.onBookAdded(book);
      await axios.post(`${url}/book`, { book });
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

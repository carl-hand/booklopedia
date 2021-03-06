import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { url } from "../../shared/constants";
import { AddButton } from "./AddButton";
import { fetchWithRetry, HTTP_METHODS } from "../../utils/fetchUtils";

const searchBarContainerCss = css`
  padding: 0 30px;
  height: 100%;
  display: flex;
  justify-content: center;
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

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchTerm(value);
  };

  const handleClick = async () => {
    if (searchTerm) {
      const newBook = await search();
      if (newBook) {
        addNewBook(newBook);
      }
    }
  };

  const search = async () => {
    const response = await fetchWithRetry(
      `${url}/search?searchTerm=${searchTerm}`,
      3,
      HTTP_METHODS.GET
    );
    const data = response.data;
    const books = data.items;
    if (books) {
      const foundBook = books[0];
      const title = foundBook?.volumeInfo?.title;
      const authorNames = foundBook?.volumeInfo?.authors;
      const description = foundBook?.volumeInfo?.description;
      const info_link = foundBook?.volumeInfo?.infoLink;
      const category = foundBook?.volumeInfo?.categories?.[0];
      const thumbnail = foundBook?.volumeInfo?.imageLinks?.smallThumbnail;
      console.log("thumbnail", thumbnail);
      const secureThumbnail = thumbnail.replace("http", "https");
      console.log("secureThumbnail", secureThumbnail);
      const newBook = {
        title,
        authorNames,
        description,
        category,
        thumbnail: secureThumbnail,
        info_link,
      };
      return newBook;
    }
  };

  const addNewBook = async (book) => {
    if (book) {
      props.onBookAdded(book);
      await fetchWithRetry(`${url}/book`, 3, HTTP_METHODS.POST, { book });
    }
  };

  return (
    <div css={searchBarContainerCss}>
      <input
        css={inputSearchCss}
        placeholder="Add a book here, e.g. Principles by Ray Dalio"
        onChange={handleChange}
      />
      <AddButton handleAddClick={handleClick} />
    </div>
  );
};

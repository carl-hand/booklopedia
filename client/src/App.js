import React, { useEffect, useState } from "react";
import axios from "axios";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Book } from "./features/book/Book";
import { url } from "./shared/constants";
import { logPageView } from "./utils/analyticUtils";
import dotenv from "dotenv";

dotenv.config();

const appContainerCss = css`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const bookItemBarCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [books, setBooks] = useState([]);

  logPageView();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const numRetries = 3;
        const result = await fetchDataWithRetry(numRetries);
        const data = result.data;

        for (const book of data) {
          const { authors: authorIds } = book;
          const authorNames = [];
          for (const authorId of authorIds) {
            const authorResult = await axios.get(`${url}/author/${authorId}`);

            authorNames.push(authorResult?.data?.name);
          }
          book.authorNames = authorNames;
        }
        setBooks(data);
      } catch (err) {
        console.log("error getBooks", err);
      }
    };

    const fetchDataWithRetry = async (n) => {
      for (let i = 0; i < n; i++) {
        try {
          return await axios.get(`${url}/books`);
        } catch (err) {
          if (i + 1 === n) {
            throw err;
          }
        }
      }
    };

    getBooks();
  }, []);

  const handleAddBook = (book) => {
    const newBooks = [book, ...books];
    setBooks(newBooks);
  };

  return (
    <div css={appContainerCss}>
      <div css={bookItemBarCss}>
        <Book books={books} onBookAdded={handleAddBook} />
      </div>
    </div>
  );
}

export default App;

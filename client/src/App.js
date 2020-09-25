import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Book } from "./features/book/Book";
import { url } from "./shared/constants";
import { logPageView } from "./utils/analyticUtils";
import { fetchWithRetry, HTTP_METHODS } from "./utils/fetchUtils";

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

  useEffect(() => {
    const getBooks = async () => {
      try {
        const numRetries = 3;
        const result = await fetchWithRetry(
          `${url}/books`,
          numRetries,
          HTTP_METHODS.GET
        );
        const data = result.data;

        for (const book of data) {
          const { authors: authorIds } = book;
          const authorNames = [];
          for (const authorId of authorIds) {
            const authorResult = await fetchWithRetry(
              `${url}/author/${authorId}`,
              numRetries,
              HTTP_METHODS.GET
            );

            authorNames.push(authorResult?.data?.name);
          }
          book.authorNames = authorNames;
        }
        setBooks(data);
      } catch (err) {
        console.log("error getBooks", err);
      }
    };

    getBooks();
    logPageView();
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

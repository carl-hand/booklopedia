import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { Book } from "./Book";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { url } from "./constants";
import { logPageView } from "./utils/analyticUtils";

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
      const result = await axios.get(`${url}/books`);
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
    };

    getBooks();
  }, []);

  const handleAddBook = (book) => {
    const newBooks = [book, ...books];
    setBooks(newBooks);
  };

  return (
    <div css={appContainerCss}>
      {/* <header> */}
      <div css={bookItemBarCss}>
        <Book books={books} onBookAdded={handleAddBook} />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;

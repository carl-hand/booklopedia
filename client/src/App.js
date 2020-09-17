import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import dotenv from "dotenv";
import { SearchBar } from "./SearchBar";
import { Book } from "./Book";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

dotenv.config();

const appContainerCss = css`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const bookItemBarCss = css``;

function App() {
  const [books, setBooks] = useState([]);
  const [currPageNumbers, setCurrPageNumbers] = useState({ left: 0, right: 1 });
  const [isPrevious, setIsPrevious] = useState(false);
  const [isNext, setIsNext] = useState(false);

  let url =
    process.env.NODE_ENV === "production"
      ? "https://booklopedia.herokuapp.com"
      : "http://localhost:5000";

  useEffect(() => {
    const getBooks = async () => {
      const result = await axios.get(`${url}/books`);
      const data = result.data;

      for (const book of data) {
        for (const authorId of book.authors) {
          const authorResult = await axios.get(`${url}/author/${authorId}`);

          book.authorName = authorResult.data.name;
        }
      }
      setBooks(data);
    };

    getBooks();
  }, []);

  const handleAddBook = (book) => {
    const newBooks = [...books, book];
    setBooks(newBooks);
  };

  const handleTurnPage = (isPrevious) => {
    const { left, right } = currPageNumbers;
    if (isPrevious) {
      const isFirstPage = left === 0;
      if (!isFirstPage) {
        setIsPrevious(true);
        setTimeout(() => {
          setCurrPageNumbers({ left: left - 2, right: right - 2 });
          // cancel css animation
          setIsPrevious(false);
        }, 400);
      }
    } else {
      const lastPageIndex = books.length - 1;
      const isLastPage = left === lastPageIndex || right === lastPageIndex;
      if (!isLastPage) {
        setIsNext(true);
        setTimeout(() => {
          setCurrPageNumbers({ left: left + 2, right: right + 2 });
          // cancel css animation
          setIsNext(false);
        }, 400);
      }
    }
  };

  return (
    <div css={appContainerCss}>
      {/* <header> */}
      <div css={bookItemBarCss}>
        <SearchBar onBookAdded={handleAddBook} />
        <Book
          books={books}
          turnPage={handleTurnPage}
          currPageNumbers={currPageNumbers}
          isPrevious={isPrevious}
          isNext={isNext}
        />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;

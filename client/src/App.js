import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { SearchBar } from "./SearchBar";
import { Book } from "./Book";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { url } from './constants';

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
  const [currPageNumbers, setCurrPageNumbers] = useState({ left: 0, right: 1 });
  const [isPrevious, setIsPrevious] = useState(false);
  const [isNext, setIsNext] = useState(false);

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
        <Book
          books={books}
          turnPage={handleTurnPage}
          currPageNumbers={currPageNumbers}
          isPrevious={isPrevious}
          isNext={isNext}
        />
        <SearchBar onBookAdded={handleAddBook} />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;

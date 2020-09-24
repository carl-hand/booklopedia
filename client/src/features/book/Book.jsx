import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { LeftPage } from "./LeftPage";
import { RightPage } from "./RightPage";
import { bookCoverColor } from "../../shared/styles/book";

const containerCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60%;
  min-height: 500px;
  perspective: 4000px;
  perspective-origin: 50% 0%;
`;

const bookWrapperCss = css`
  width: 57vw;
  min-width: 450px;
  display: flex;
  justify-content: center;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 5%, -264px) rotateX(27deg) rotateY(0deg)
    rotateZ(-7deg);
  transition: transform 1s;
  transform-style: preserve-3d;

  &:hover {
    transform: translate3d(0px, 5%, -264px) rotateX(20deg) rotateY(-5deg)
      rotateZ(-2deg);
  }
`;

const centerCss = css`
  width: 3%;
  background-image: radial-gradient(
      circle farthest-corner at 56% -8%,
      hsl(0, 0%, 100%) 8%,
      transparent 0
    ),
    radial-gradient(
      circle farthest-corner at 50% 108%,
      hsl(0, 0%, 100%) 8%,
      transparent 0
    ),
    linear-gradient(
      90deg,
      ${bookCoverColor.secondary},
      ${bookCoverColor.primary} 21%,
      ${bookCoverColor.secondary} 30%,
      ${bookCoverColor.primary} 48%,
      ${bookCoverColor.secondary} 68%,
      ${bookCoverColor.primary} 79%,
      ${bookCoverColor.secondary}
    );
`;

export const NavigationDirection = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const DEFAULT_TIMEOUT_MS = 500;
const NUM_PAGES_OPEN = 2;

export const Book = (props) => {
  const [currPageNumbers, setCurrPageNumbers] = useState({
    first: 0,
    second: 1,
  });
  const [isPrevious, setIsPrevious] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { books = [] } = props;

  const turnPage = (direction) => {
    const { first, second } = currPageNumbers;
    if (direction === NavigationDirection.LEFT) {
      const isFirstPage = first === 0;
      if (!isFirstPage) {
        turnToPreviousPage();
      }
    } else {
      const lastPageIndex = books.length;
      const isLastPage = first === lastPageIndex || second === lastPageIndex;
      if (!isLastPage) {
        turnToNextPage();
      }
    }
  };

  const turnToPreviousPage = () => {
    setIsPrevious(true);
    setTimeout(() => {
      const { first, second } = currPageNumbers;
      setCurrPageNumbers({
        first: first - NUM_PAGES_OPEN,
        second: second - NUM_PAGES_OPEN,
      });
      // cancel css animation
      setIsPrevious(false);
      setIsLoading(true);
    }, DEFAULT_TIMEOUT_MS);
  };

  const turnToNextPage = () => {
    setIsNext(true);
    setTimeout(() => {
      const { first, second } = currPageNumbers;
      setCurrPageNumbers({
        first: first + NUM_PAGES_OPEN,
        second: second + NUM_PAGES_OPEN,
      });
      // cancel css animation
      setIsNext(false);
      setIsLoading(true);
    }, DEFAULT_TIMEOUT_MS);
  };

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  const onBookAdded = (book) => {
    props.onBookAdded(book);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT_MS);
  };

  const getCurrentBooks = () => {
    const { books = [] } = props;
    const { first, second } = currPageNumbers;
    // add fake entry for search bar to keep first and second page numbers in sync when turning pages
    const booksWithSearchBar = ["SearchBar", ...books];
    const currentBooks = [];
    if (first < booksWithSearchBar.length) {
      currentBooks.push(getBook(first, booksWithSearchBar));

      if (second < booksWithSearchBar.length) {
        currentBooks.push(getBook(second, booksWithSearchBar));
      }
    }

    return currentBooks;
  };

  const getBook = (index, booksWithSearchBar) => {
    const book = booksWithSearchBar[index];
    const { title, authorNames, description, info_link, thumbnail } = book;

    return {
      title,
      authorNames,
      description,
      info_link,
      thumbnail,
    };
  };

  const currentBooks = getCurrentBooks();

  return (
    <React.Fragment>
      <div css={containerCss}>
        <div css={bookWrapperCss}>
          <LeftPage
            book={currentBooks[0]}
            turnPage={turnPage}
            isTurningPage={isPrevious}
            handleOnLoad={handleOnLoad}
            isLoading={isLoading}
            isFirstPage={currPageNumbers.first === 0}
            onBookAdded={onBookAdded}
          />

          <div css={centerCss}></div>

          <RightPage
            book={currentBooks[1]}
            turnPage={turnPage}
            isTurningPage={isNext}
            handleOnLoad={handleOnLoad}
            isLoading={isLoading}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

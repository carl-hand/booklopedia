import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { LeftPage } from "./LeftPage";
import { RightPage } from "./RightPage";

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
  min-width: 700px;
  display: flex;
  justify-content: center;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 5%, -264px) rotateX(27deg) rotateY(0deg)
    rotateZ(-10deg);
  transition: transform 2000ms cubic-bezier(0.165, 0.84, 0.44, 1),
    -webkit-transform 2000ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transform-style: preserve-3d;
`;

const centerCss = css`
  width: 3%;
  background-image: radial-gradient(
      circle farthest-corner at 56% -8%,
      #fff 8%,
      transparent 0
    ),
    radial-gradient(circle farthest-corner at 50% 108%, #fff 8%, transparent 0),
    linear-gradient(
      90deg,
      #635648,
      #2e1800 21%,
      #635648 30%,
      #2e1800 48%,
      #635648 68%,
      #2e1800 79%,
      #635648
    );
`;

export const NavigationDirection = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export const Book = (props) => {
  const [currPageNumbers, setCurrPageNumbers] = useState({ left: 0, right: 1 });
  const [isPrevious, setIsPrevious] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const { books = [] } = props;

  const turnPage = (direction) => {
    const { left, right } = currPageNumbers;
    if (direction == NavigationDirection.LEFT) {
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

  const getCurrentBooks = () => {
    const { books = [] } = props;
    const { left, right } = currPageNumbers;
    const currentBooks = [];
    if (books.length > 0 && left < books.length) {
      const firstBook = books[left];
      const {
        title,
        authorName,
        description,
        info_link,
        thumbnail,
      } = firstBook;
      currentBooks.push({
        title,
        authorName,
        description,
        info_link,
        thumbnail,
      });

      if (right < books.length) {
        const secondBook = books[right];
        const {
          title: secondBookTitle,
          authorName: secondBookAuthorName,
          description: secondBookDescription,
          info_link: secondBookInfoLink,
          thumbnail: secondBookThumbnail,
        } = secondBook;
        currentBooks.push({
          title: secondBookTitle,
          authorName: secondBookAuthorName,
          description: secondBookDescription,
          info_link: secondBookInfoLink,
          thumbnail: secondBookThumbnail,
        });
      }
    }

    return currentBooks;
  };

  const currentBooks = getCurrentBooks();

  return (
    <React.Fragment>
      <div css={containerCss}>
        <div css={bookWrapperCss}>
          <LeftPage
            books={currentBooks}
            turnPage={turnPage}
            isTurningPage={isPrevious}
          />

          <div css={centerCss}></div>

          <RightPage
            books={currentBooks}
            turnPage={turnPage}
            isTurningPage={isNext}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

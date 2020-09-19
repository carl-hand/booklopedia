import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { PageContent } from "./PageContent";
import { Page, LeftPage } from "./LeftPage";
import {
  layer1Css,
  layer2Css,
  layer3Css,
  layer4Css,
  textLayerCss,
} from "./shared/styles/page";

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

const rightCss = css`
  width: 49%;
  position: relative;
  display: flex;
  perspective: 4000px;
  perspective-origin: 0% 50%;
  transform: rotateX(0deg) rotateY(-1deg) rotateZ(0deg);
  transform-style: preserve-3d;
`;

const bookCoverRightCss = css`
  flex: 1;
  border-top-right-radius: 4%;
  border-bottom-right-radius: 4%;
  background-color: #2e1800;
  box-shadow: inset -4px -4px 4px 1px #635648, inset -7px -7px 4px 0 #221b14;
`;

const textLayerRightCss = css`
  ${textLayerCss}
  transform: translate3d(-37px, 0px, 32px);
`;

const pageRightCss = css`
  flex: 1;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, 1px 1px 13px 0 rgba(34, 27, 20, 0.81);
`;

const pageRight2Css = css`
  position: relative;
  flex: 1;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 7px 4px hsla(0, 13%, 82%, 0.43),
    1px 1px 13px 0 rgba(34, 27, 20, 0.49);
  backface-visibility: hidden;
  transform: rotateX(0deg) rotateY(-3deg) rotateZ(0deg);
  transform-origin: 0% 50%;
  transition: transform 800ms ease-in-out, -webkit-transform 800ms ease-in-out;
  transform-style: preserve-3d;
`;

const nextPageCss = css`
  ${pageRight2Css}
  transform: rotateX(0deg) rotateY(-160deg) rotateZ(0deg);
`;

const layer2RightCss = css`
  ${layer2Css}

  transform: translate3d(-5px, 0px, 10px);
`;

const layer3RightCss = css`
  ${layer3Css}

  transform: translate3d(-10px, 0px, 20px);
`;

const layer4RightCss = css`
  ${layer4Css}

  transform: translate3d(-15px, 0px, 30px);
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

          <div css={rightCss}>
            <div css={bookCoverRightCss}></div>
            <div css={layer1Css}>
              <div css={pageRightCss}></div>
            </div>
            <div css={layer2RightCss}>
              <div css={pageRightCss}></div>
            </div>
            <div css={layer3RightCss}>
              <div css={pageRightCss}></div>
            </div>
            <div css={layer4RightCss}>
              <div css={pageRightCss}></div>
            </div>
            <div css={textLayerRightCss}>
              <div css={pageRight2Css} onClick={turnPage}>
                {currentBooks.length > 1 && (
                  <PageContent book={currentBooks[1]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

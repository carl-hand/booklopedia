import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { PageContent } from "./PageContent";
import { NavigationDirection } from "./Book";
import { SearchBar } from "./SearchBar";
import { bookCoverCss, bookCoverColor } from "../../shared/styles/book";
import {
  layer1Css,
  layer2Css,
  layer4Css,
  layer3Css,
  textLayerCss,
  pageContainerCss,
  blankPageCss,
} from "../../shared/styles/page";
import { maxScreenWidth } from "../../shared/variables";

const leftPageContainerCss = css`
  ${pageContainerCss}
  backface-visibility: hidden;
  transform: rotateX(0deg) rotateY(20deg) rotateZ(0deg);
  transform-origin: 100% 50%;
`;

const bookCoverLeftCss = css`
  ${bookCoverCss}
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: inset 4px -4px 4px 1px ${bookCoverColor.primary},
    inset 7px -7px 4px 0 ${bookCoverColor.primary};
`;

const blankLeftPageCss = css`
  ${blankPageCss}
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: inset 0 0 26px 2px #d8cccc, -1px 1px 13px 0 rgba(34, 27, 20, 0.81);
`;

const cornerCss = css`
  position: absolute;
  left: 0px;
  top: 27px;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, hsl(0, 0%, 100%) 30%, transparent);
  box-shadow: inset 13px 0 17px -12px hsla(0, 13%, 82%, 0.43);
`;

const corner2Css = css`
  position: absolute;
  left: 28px;
  top: 0px;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, hsl(0, 0%, 100%) 31%, transparent);
  box-shadow: inset 0 13px 17px -12px hsla(0, 13%, 82%, 0.43);
`;

const cornerFoldCss = css`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 30px;
  height: 30px;
  border-right: 1px solid hsla(0, 13%, 82%, 0.55);
  border-bottom: 1px solid hsla(0, 13%, 82%, 0.55);
  background-image: linear-gradient(
    135deg,
    transparent 47%,
    #f0f0f0 48%,
    #fff 55%,
    #f6f6f6
  );
  box-shadow: 6px 6px 9px -4px hsla(0, 13%, 82%, 0.53);
`;

const pageContentContainerCss = css`
  position: relative;
  flex: 1;
  width: 100%;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 4px;
  background-color: hsl(0, 0%, 100%);
  box-shadow: inset 0 0 7px 4px hsla(0, 13%, 82%, 0.43),
    -1px 1px 13px 0 rgba(34, 27, 20, 0.49);
  transform: rotateX(0deg) rotateY(12deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
  transform-style: preserve-3d;

  @media screen and (max-width: 1400px) {
    padding: 10px;
  }

  @media screen and (max-width: ${maxScreenWidth.tablet}px) {
    padding: 20px;
    width: 80%;
  }
`;

const previousPageCss = css`
  ${pageContentContainerCss}
  transform: rotateX(0deg) rotateY(140deg) rotateZ(0deg);
`;

export const LeftPage = (props) => {
  const { book, turnPage, isTurningPage, isLoading, isFirstPage } = props;

  const previousPage = () => {
    turnPage(NavigationDirection.LEFT);
  };

  const handleOnLoad = () => {
    props.handleOnLoad();
  };

  const onBookAdded = (book) => {
    props.onBookAdded(book);
  };

  const getPageContent = () => {
    if (isFirstPage) {
      return <SearchBar onBookAdded={onBookAdded} />;
    } else if (book) {
      return (
        <PageContent
          book={book}
          isLoading={isLoading}
          handleOnLoad={handleOnLoad}
        />
      );
    }

    return null;
  };

  const getBlankPages = () => {
    const blankPageElements = [];
    const layerCssObjs = {
      0: layer1Css,
      1: layer2Css,
      2: layer3Css,
      3: layer4Css,
    };
    for (let i = 0; i < 4; i++) {
      blankPageElements.push(
        <div key={i} css={layerCssObjs[i]}>
          <div css={blankLeftPageCss}></div>
        </div>
      );
    }

    return blankPageElements;
  };

  const blankPageElements = getBlankPages();
  let actualPageContentContainerCss = pageContentContainerCss;
  if (isTurningPage) {
    actualPageContentContainerCss = previousPageCss;
  }

  return (
    <div css={leftPageContainerCss}>
      <div css={bookCoverLeftCss}></div>
      {blankPageElements.map((element) => {
        return element;
      })}
      <div css={textLayerCss}>
        <div css={actualPageContentContainerCss} onClick={previousPage}>
          <div css={cornerCss}></div>
          <div css={corner2Css}></div>
          <div css={cornerFoldCss}></div>
          {getPageContent()}
        </div>
      </div>
    </div>
  );
};

import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NavigationDirection } from "./Book";
import { PageContent } from "./PageContent";
import { bookCoverCss, bookCoverColor } from "./shared/styles/book";
import {
  layer2Css,
  layer3Css,
  layer4Css,
  textLayerCss,
  layer1Css,
} from "./shared/styles/page";

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
  ${bookCoverCss}
  border-top-right-radius: 4%;
  border-bottom-right-radius: 4%;
  box-shadow: inset -4px -4px 4px 1px ${bookCoverColor.primary},
    inset -7px -7px 4px 0 ${bookCoverColor.primary};
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
  transform: rotateX(0deg) rotateY(-3deg) rotateZ(0deg);
  transform-origin: 0% 50%;
  transition: transform 800ms ease-in-out, -webkit-transform 800ms ease-in-out;
  transform-style: preserve-3d;
`;

const nextPageCss = css`
  ${pageRight2Css}
  transform: rotateX(0deg) rotateY(-140deg) rotateZ(0deg);
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

export const RightPage = (props) => {
  const { books = [], turnPage, isTurningPage, isLoading } = props;

  const nextPage = () => {
    turnPage(NavigationDirection.RIGHT);
  };

  const handleOnLoad = () => {
    props.handleOnLoad();
  };

  let actualPageRight2Css = pageRight2Css;
  if (isTurningPage) {
    actualPageRight2Css = nextPageCss;
  }

  return (
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
        <div css={actualPageRight2Css} onClick={nextPage}>
          {books.length > 1 && (
            <PageContent
              book={books[1]}
              isLoading={isLoading}
              handleOnLoad={handleOnLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { PageContent } from "./PageContent";
import { NavigationDirection } from "./Book";
import {
  layer1Css,
  layer2Css,
  layer4Css,
  layer3Css,
  textLayerCss,
} from "./shared/styles/page";

const leftCss = css`
  position: relative;
  width: 49%;
  display: flex;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 0% 50%;
  transform: rotateX(0deg) rotateY(20deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  transform-style: preserve-3d;
`;

const bookCoverLeftCss = css`
  flex: 1;
  border-top-left-radius: 4%;
  border-bottom-left-radius: 4%;
  background-color: #2e1800;
  box-shadow: inset 4px -4px 4px 1px #635648, inset 7px -7px 4px 0 #221b14;
  perspective: 4000px;
  transform: translate3d(0px, 0px, -1px);
  transform-style: preserve-3d;
`;

const pageLeftCss = css`
  flex: 1;
  border-top-left-radius: 1%;
  border-bottom-left-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, -1px 1px 13px 0 rgba(34, 27, 20, 0.81);
`;

const cornerCss = css`
  position: absolute;
  left: 0px;
  top: 27px;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, #fff 30%, transparent);
  box-shadow: inset 13px 0 17px -12px hsla(0, 13%, 82%, 0.43);
`;

const corner2Css = css`
  position: absolute;
  left: 28px;
  top: 0px;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, #fff 31%, transparent);
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

const pageLeft2Css = css`
  position: relative;
  flex: 1;
  border-top-left-radius: 18%;
  border-bottom-left-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 7px 4px hsla(0, 13%, 82%, 0.43),
    -1px 1px 13px 0 rgba(34, 27, 20, 0.49);
  backface-visibility: hidden;
  transform: rotateX(0deg) rotateY(4deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
  transform-style: preserve-3d;
`;

const previousPageCss = css`
  ${pageLeft2Css}
  transform: rotateX(0deg) rotateY(160deg) rotateZ(0deg);
`;

export const LeftPage = (props) => {
  const { books = [], turnPage, isTurningPage, isLoading } = props;

  let actualPageLeft2Css = pageLeft2Css;
  if (isTurningPage) {
    actualPageLeft2Css = previousPageCss;
  }

  const previousPage = () => {
    turnPage(NavigationDirection.LEFT);
  };

  const handleOnLoad = () => {
    props.handleOnLoad();
  };

  return (
    <div css={leftCss}>
      <div css={bookCoverLeftCss}></div>
      <div css={layer1Css}>
        <div css={pageLeftCss}></div>
      </div>
      <div css={layer2Css}>
        <div css={pageLeftCss}></div>
      </div>
      <div css={layer3Css}>
        <div css={pageLeftCss}></div>
      </div>
      <div css={layer4Css}>
        <div css={pageLeftCss}></div>
      </div>

      <div css={textLayerCss}>
        <div css={actualPageLeft2Css} onClick={previousPage}>
          <div css={cornerCss}></div>
          <div css={corner2Css}></div>
          <div css={cornerFoldCss}></div>
          {books.length > 0 && (
            <PageContent
              book={books[0]}
              isLoading={isLoading}
              handleOnLoad={handleOnLoad}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

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

const layerCss = css`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: flex-start;
  transform-style: preserve-3d;
`;

const layer1Css = css`
  ${layerCss}
  margin: 20px 10px 10px;
  transform: translate3d(0px, 0px, 5px);
`;

const layer3Css = css`
  ${layerCss}

  margin: 20px 10px 13px;
  transform: translate3d(4px, 0px, 20px);
`;

const layer4Css = css`
  ${layerCss}

  margin: 20px 10px 15px;
  transform: translate3d(6px, 0px, 30px);
`;

const layer2Css = css`
  ${layerCss}

  margin: 20px 10px 13px;
  transform: translate3d(2px, 0px, 10px);
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

const pageLeftCss = css`
  flex: 1;
  border-top-left-radius: 1%;
  border-bottom-left-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, -1px 1px 13px 0 rgba(34, 27, 20, 0.81);
`;

const pageRightCss = css`
  flex: 1;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, 1px 1px 13px 0 rgba(34, 27, 20, 0.81);
`;

const textLayerCss = css`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  width: 97%;
  margin: 20px 10px 18px;
  justify-content: flex-start;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 0px, 32px);
  transform-style: preserve-3d;
`;

const textLayerRightCss = css`
  ${textLayerCss}
  transform: translate3d(-37px, 0px, 32px);
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

const contentCss = css`
  position: relative;
  display: block;
  width: 80%;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
  font-family: Georgia, Times, "Times New Roman", serif;
  max-height: 60%;
  overflow: hidden;
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

export const Book = (props) => {
  const handlePrevious = () => {
    props.turnPage(true);
  };

  const handleNext = () => {
    props.turnPage(false);
  };

  let actualPageLeft2Css = pageLeft2Css;
  let actualPageRight2Css = pageRight2Css;
  if (props.isPrevious) {
    actualPageLeft2Css = previousPageCss;
  } else if (props.isNext) {
    actualPageRight2Css = nextPageCss;
  }

  const getCurrentBooks = () => {
    const { books = [], currPageNumbers } = props;
    const { left, right } = currPageNumbers;
    const currentBooks = [];
    if (books.length > 0 && left < books.length) {
      const firstBook = books[left];
      const { title, authorName, description } = firstBook;
      currentBooks.push({ title, authorName, description });

      if (right < books.length) {
        const secondBook = books[right];
        const {
          title: secondBookTitle,
          authorName: secondBookAuthorName,
          description: secondBookDescription,
        } = secondBook;
        currentBooks.push({
          title: secondBookTitle,
          authorName: secondBookAuthorName,
          description: secondBookDescription,
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
              <div css={actualPageLeft2Css} onClick={handlePrevious}>
                <div css={cornerCss}></div>
                <div css={corner2Css}></div>
                <div css={cornerFoldCss}></div>
                {currentBooks.length > 0 && (
                  <div css={contentCss}>
                    <h2>{currentBooks[0].title}</h2>
                    <h4>by {currentBooks[0].authorName}</h4>
                    <p>{currentBooks[0].description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

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
              <div css={actualPageRight2Css} onClick={handleNext}>
                {currentBooks.length > 1 && (
                  <div css={contentCss}>
                    <h2>{currentBooks[1].title}</h2>
                    <h4>by {currentBooks[1].authorName}</h4>
                    <p>{currentBooks[0].description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

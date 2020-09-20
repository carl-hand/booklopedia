import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const contentCss = css`
  position: relative;
  display: block;
  width: 80%;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
  font-family: Georgia, Times, "Times New Roman", serif;
  height: 90%;
  overflow: hidden;
`;

const headingImageWrapperCss = css`
  display: flex;
  justify-content: space-between;
  height: 125px;
`;

const headerWrapperCss = css`
  padding-right: 12px;
`;

const imageWrapperCss = css`
  display: flex;
`;

const thumbnailCss = css`
  height: 100px;
  width: 80px;
`;

const loadingCss = css`
  ${thumbnailCss}
  background-color: #fff;
  position: absolute;
  margin-bottom: 0;
  overflow: hidden;

  &:before {
    content: '';
    height: 100px;
    display: block;
    background-color: #ededed;
    box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
  }

  &:after {
    content: '';
    background-color: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);

    @keyframes loader-animate {
      0%{
        transform: translateX(-100%);
      }
      100%{
        transform: translateX(100%);
      }
  }
`;

export const PageContent = (props) => {
  const { book, isLoading } = props;
  const { title, authorNames = [], info_link, thumbnail, description } = book;
  const authorName = authorNames.length ? authorNames.join(", ") : "";

  const handleOnLoad = () => {
    // for cases where the user has fast internet speed, resulting in the skeleton
    // image only appearing for a few ms before the actual image loads causing a jittery experience
    setTimeout(() => {
      props.handleOnLoad();
    }, 500);
  };

  const style = isLoading ? { visibility: "hidden" } : {};

  return (
    <div css={contentCss}>
      <div css={headingImageWrapperCss}>
        <div css={headerWrapperCss}>
          <h2>{title}</h2>
          <h4>by {authorName}</h4>
        </div>

        <div css={imageWrapperCss}>
          <a href={info_link} target="_blank" rel="noopener noreferrer">
            <img
              style={style}
              css={thumbnailCss}
              src={thumbnail}
              alt={title}
              onLoad={handleOnLoad}
            />
          </a>
          {isLoading && <div css={loadingCss}></div>}
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

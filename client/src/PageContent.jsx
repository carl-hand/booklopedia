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

const headingWrapperCss = css`
  display: flex;
  justify-content: space-between;
`;

const thumbnailCss = css`
  height: 100px;
`;

export const PageContent = (props) => {
  const { book } = props;
  const { title, authorName, info_link, thumbnail, description } = book;

  return (
    <div css={contentCss}>
      <div css={headingWrapperCss}>
        <div>
          <h2>{title}</h2>
          <h4>by {authorName}</h4>
        </div>
        <a href={info_link} target="_blank">
          <img css={thumbnailCss} src={thumbnail} />
        </a>
      </div>
      <p>{description}</p>
    </div>
  );
};

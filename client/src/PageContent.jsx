import React from "react";
import Shiitake from "shiitake";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ImageLoadingSkeleton } from "./ImageLoadingSkeleton";
import { thumbnailCss } from "./shared/styles/page";
import { maxScreenWidth } from './shared/variables';

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
`;

const headerWrapperCss = css`
  padding-right: 12px;
  width: calc(100% - 80px);

  @media screen and (max-width: ${maxScreenWidth.tablet}px) {
    width: 100%;
  }
`;

const headingCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const imageWrapperCss = css`
  display: flex;

  @media screen and (max-width: ${maxScreenWidth.tablet}px) {
    display: none;
  }
`;

const anchorCss = css`
  color: rgb(0, 0, 238);
`;

const descriptionCss = css`
  line-height: 1.5;
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

  const handleReadMoreClick = (evt) => {
    // prevent event bubbling up to parent causing turn page event to be fired off
    evt.stopPropagation();
  };

  const style = isLoading ? { visibility: "hidden" } : {};

  // TODO: get current width of page and set lines accordingly
  // const numberOfLines = 

  return (
    <div css={contentCss}>
      <div css={headingImageWrapperCss}>
        <div css={headerWrapperCss}>
          <h2 css={headingCss} title={title}>
            {title}
          </h2>
          <h4 css={headingCss} title={authorName}>
            by {authorName}
          </h4>
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
          {isLoading && <ImageLoadingSkeleton />}
        </div>
      </div>
      <Shiitake
        css={descriptionCss}
        lines={12}
        throttleRate={1000}
        overflowNode={
          <a
            css={anchorCss}
            href={info_link}
            onClick={handleReadMoreClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            ... read more
          </a>
        }
      >
        {description}
      </Shiitake>
    </div>
  );
};

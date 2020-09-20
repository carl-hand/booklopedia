import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { thumbnailCss } from "./shared/styles/page";

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

export const ImageLoadingSkeleton = (props) => {
  return <div css={loadingCss}></div>;
};

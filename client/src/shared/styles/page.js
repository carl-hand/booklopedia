/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { defaultImageWidth } from "../variables";

const layerCss = css`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  transform-style: preserve-3d;
`;

export const layer1Css = css`
  ${layerCss}
  margin: 20px 10px 10px;
  transform: translate3d(0px, 0px, 5px);
`;

export const layer2Css = css`
  ${layerCss}

  margin: 20px 10px 13px;
  transform: translate3d(2px, 0px, 10px);
`;

export const layer3Css = css`
  ${layerCss}

  margin: 20px 10px 13px;
  transform: translate3d(4px, 0px, 20px);
`;

export const layer4Css = css`
  ${layerCss}

  margin: 20px 10px 15px;
  transform: translate3d(6px, 0px, 30px);
`;

export const textLayerCss = css`
  ${layerCss}
  width: 97%;
  margin: 20px 10px 18px;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 0px, 32px);
`;

export const thumbnailCss = css`
  height: 100px;
  width: ${defaultImageWidth}px;
`;

export const pageContainerCss = css`
  width: 49%;
  position: relative;
  display: flex;
  perspective: 4000px;
  perspective-origin: 0% 50%;
  transform-style: preserve-3d;
`;

export const blankPageCss = css`
  flex: 1;
  background-color: hsl(0, 0%, 100%);
`;

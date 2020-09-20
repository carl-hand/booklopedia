/** @jsx jsx */
import { jsx, css } from "@emotion/core";

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

export const thumbnailCss = css`
  height: 100px;
  width: 80px;
`;

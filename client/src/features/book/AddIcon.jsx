import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SIZING_AND_SPACING_PX } from "../../shared/sizingSystem";

const svgCss = css`
  height: ${SIZING_AND_SPACING_PX[32]};
  width: ${SIZING_AND_SPACING_PX[32]};
`;

const primaryCss = css`
  fill: hsl(158, 58%, 62%);
`;

const secondaryCss = css`
  fill: hsl(240, 95%, 76%);
`;

export const AddIcon = (props) => {
  return (
    <React.Fragment>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" css={svgCss}>
        <circle cx="12" cy="12" r="10" css={secondaryCss} />
        <path
          css={primaryCss}
          d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"
        />
      </svg>
    </React.Fragment>
  );
};

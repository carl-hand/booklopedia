/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export const bookCoverColor = {
  primary: "hsl(22, 83%, 19%)",
  secondary: "hsl(22, 80%, 26%)",
};

export const bookCoverCss = css`
  flex: 1;
  background-color: ${bookCoverColor.primary};
`;

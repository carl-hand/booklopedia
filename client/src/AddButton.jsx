import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { AddIcon } from "./AddIcon";

const addBookCss = css`
  border: none;
  background-color: transparent;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`;
export const AddButton = (props) => {
  const handleClick = () => {
    props.handleAddClick();
  };

  return (
    <button css={addBookCss} type="button" onClick={handleClick}>
      <AddIcon />
    </button>
  );
};

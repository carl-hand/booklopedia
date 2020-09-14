import React from "react";

export const BookList = (props) => {
  const { books = [] } = props;

  return (
    <div>
      <ul>
        {books.map((book) => {
          return (
            <li>
              {book.title}:{book.authorName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

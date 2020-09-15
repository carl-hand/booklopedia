import React, { useState } from "react";
import axios from "axios";

export const ItemBar = (props) => {
  const [title, setTitle] = useState("");

  let url =
    process.env.NODE_ENV === "production"
      ? "https://booklopedia.herokuapp.com"
      : "http://localhost:5000";

  const handleChange = (evt) => {
    const { value } = evt.target;
    setTitle(value);
  };

  const handleClick = () => {
    addNewBook();
  };

  const addNewBook = async () => {
    if (title) {
      const book = {
        title,
        category: "Horror",
        authors: ["Carl Hand"],
      };
      const response = await axios.post(`${url}/book`, { book });
      props.onBookAdded(response.data);
    }
  };

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Add Book</button>
    </div>
  );
};

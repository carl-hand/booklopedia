import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BookList } from "./BookList";
import dotenv from "dotenv";

dotenv.config();

function App() {
  const [books, setBooks] = useState([]);

  let url =
    process.env.NODE_ENV === "production"
      ? "https://booklopedia.herokuapp.com"
      : "http://localhost:5000";

  useEffect(() => {
    const getBooks = async () => {
      const result = await axios.get(`${url}/books`);
      const data = result.data;

      for (const book of data) {
        for (const authorId of book.authors) {
          const authorResult = await axios.get(
            `${url}/author/${authorId}`
          );

          book.authorName = authorResult.data.name;
        }
      }
      setBooks(data);
    };

    getBooks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BookList books={books} />
      </header>
    </div>
  );
}

export default App;

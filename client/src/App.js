import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const result = await axios.get("https://booklopedia.herokuapp.com/books");
      const data = result.data;

      setBooks(data);
      console.log(data);
    };

    getBooks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {books.map((book) => {
            return <li>{book.title}</li>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;

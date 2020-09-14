import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BookList } from "./BookList";

function App() {
  const [books, setBooks] = useState([]);

  let url = "https://booklopedia.herokuapp.com/books";

  useEffect(() => {
    const getBooks = async () => {
      const result = await axios.get(url);
      const data = result.data;

      // for (const book in data) {
      //   const authorResult = await axios.get(`http://localhost:5000/author/${authorId}`);
      // }
      setBooks(data);
      console.log(data);
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

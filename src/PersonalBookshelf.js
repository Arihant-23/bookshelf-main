import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PersonalBookshelf.css";

const PersonalBookshelf = () => {
  const [personalBookshelf, setPersonalBookshelf] = useState([]);
  const removeBook = (key) => {
    const currentBookshelfJSON = localStorage.getItem("bookshelf");
    const currentBookshelf = currentBookshelfJSON
      ? JSON.parse(currentBookshelfJSON)
      : [];
    const indexToRemove = currentBookshelf.findIndex(
      (book) => book.key === key
    );
    if (indexToRemove !== -1) {
      // Remove the book from the array
      currentBookshelf.splice(indexToRemove, 1);

      localStorage.setItem("bookshelf", JSON.stringify(currentBookshelf));
    }
  };

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setPersonalBookshelf(savedBookshelf);
  }, []);

  return (
    <div className="container">
      <h1>My Bookshelf</h1>
      <Link to="/">
        <button className="button-search">Back to Search</button>
      </Link>
      <br />
      <div className="bookshelf">
        {personalBookshelf.map((book) => (
          <div className="book-card" key={book.key}>
            <h3> Title: {book.title}</h3>
            <p>Edition Count: {book.edition_count}</p>
            <button
              className="remove-book"
              onClick={() => removeBook(book.key)}
            >
              {" "}
              Remove Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookshelf;

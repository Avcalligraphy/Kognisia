import React from "react";

function BookRow({ books, onBookClick }) {
  return (
    <div className="books-row">
      {books.map((book, index) => (
        <div
          key={index}
          className="book"
          onClick={() => onBookClick(book.link)}
        >
          <img src={book.image} alt={book.alt || `Buku ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default BookRow;

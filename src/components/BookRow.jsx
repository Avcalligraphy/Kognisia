import React from "react";

const BookRow = React.forwardRef(function BookRow({ books, onBookClick }, ref) {
  return (
    <div className="books-row" ref={ref}>
      {books.map((book, index) => (
        <div
          key={book.id || index}
          className="book"
          onClick={() => onBookClick(book.link)}
        >
          <img src={book.image} alt={book.alt || `Buku ${index + 1}`} />
        </div>
      ))}
    </div>
  );
});

export default BookRow;

import React from "react";
import { useState, useEffect, useRef } from "react";
import "../style.css";
import BookRow from "../components/BookRow";
import Spinner from "../components/Spinner";
import { subscribeToBooks } from "../firebase/booksService";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBookLink, setSelectedBookLink] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const booksRowRef = useRef(null);

  // Fetch books from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToBooks("home", (books) => {
      setBooksData(books);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = isPopupOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handleBookClick = (link) => {
    setSelectedBookLink(link);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBookLink("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  const handleScrollLeft = () => {
    if (booksRowRef.current) {
      booksRowRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (booksRowRef.current) {
      booksRowRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bookshelf-container">
        <button
          className="scroll-arrow scroll-arrow-left"
          onClick={handleScrollLeft}
        >
          ‹
        </button>
        <div className="bookshelf">
          {isLoading ? (
            <Spinner />
          ) : (
            <BookRow
              books={booksData}
              onBookClick={handleBookClick}
              ref={booksRowRef}
            />
          )}
          <div className="shelf">
            <img
              src="/images/woods.png"
              alt="Rak Buku"
              className="shelf-image"
            />
          </div>
        </div>
        <button
          className="scroll-arrow scroll-arrow-right"
          onClick={handleScrollRight}
        >
          ›
        </button>
      </div>

      {/* Popup Modal */}
      <div
        className={`popup-overlay ${isPopupOpen ? "active" : ""}`}
        onClick={handleOverlayClick}
      >
        <div className="popup-container">
          <button className="popup-close" onClick={handleClosePopup}>
            &times;
          </button>
          <div className="popup-content">
            {isPopupOpen && selectedBookLink && (
              <iframe src={selectedBookLink} frameBorder="0" title="Flipbook" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

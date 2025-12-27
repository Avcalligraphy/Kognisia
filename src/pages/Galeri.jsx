import React from "react";
import { useState, useEffect } from "react";
import "../style.css";
import BookRow from "../components/BookRow";

const BOOKS_DATA = [
  {
    image: "https://kognisia.co/wp-content/uploads/2025/12/image-galeri.png",
    link: "https://kognisia.co/flipbook/galeri/",
    alt: "Buletin 1",
  },
  //   {
  //     image: "https://kognisia.co/wp-content/uploads/2025/10/buletin2.jpeg",
  //     link: "https://kognisia.co/flipbook/aquarium-garis-tipis-pendidikan/",
  //     alt: "Garis Tipis Pendidikan",
  //   },
  //   {
  //     image:
  //       "https://kognisia.co/wp-content/uploads/2025/10/aQuarium-FPSBRIWAYATMU-KINI_Desember-2023.png",
  //     link: "https://kognisia.co/flipbook/aquarium-riwayatmu-kini/",
  //     alt: "Riwayatmu Kini",
  //   },
  //   {
  //     image:
  //       "https://kognisia.co/wp-content/uploads/2025/10/aQuarium-Edisi-April-2015.png",
  //     link: "https://kognisia.co/flipbook/aquarium-8-bulan-tanpa-jas-almameter/",
  //     alt: "8 Bulan Tanpa Jas Almameter",
  //   },
  //   {
  //     image:
  //       "https://kognisia.co/wp-content/uploads/2025/10/aQuarium-Edisi-Magang-2017.png",
  //     link: "https://kognisia.co/flipbook/aquarium-balada-indekos-mahasiswa/",
  //     alt: "Balada Indekos Mahasiswa",
  //   },
];

const BOOKS_DATA_BOTTOM = [
  {
    image:
      "https://kognisia.co/wp-content/uploads/2025/10/Screenshot-2025-10-16-220605.png",
    link: "https://kognisia.co/flipbook/aquarium-desas-desus-pembangunan-gedung-fpsb/",
    alt: "Desas Desus Pembangunan Gedung FPSB",
  },
  {
    image:
      "https://kognisia.co/wp-content/uploads/2025/10/Screenshot-2025-10-16-220621.png",
    link: "https://kognisia.co/flipbook/aquarim-coretlah-daku-kau-sidang/",
    alt: "Coretlah Daku Kau Sidang",
  },
  {
    image: "https://kognisia.co/wp-content/uploads/2025/10/Group-1530.png",
    link: "https://kognisia.co/flipbook/aquarium-maba-rajin/",
    alt: "Maba Rajin",
  },
  {
    image:
      "https://kognisia.co/wp-content/uploads/2025/10/aQuarium-Edisi-Juli-2015.png",
    link: "https://kognisia.co/flipbook/aquarium-uas-diganggu-liburan/",
    alt: "UAS Diganggu Liburan",
  },
  {
    image:
      "https://kognisia.co/wp-content/uploads/2025/10/aQuarium-edisi-Juni-2015.png",
    link: "https://kognisia.co/?post_type=r3d&p=5886&preview=true",
    alt: "Edisi Juni 2015",
  },
];

function Galeri() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBookLink, setSelectedBookLink] = useState("");

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

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        <div className="bookshelf-container galeri-page">
          <div className="bookshelf">
            <BookRow books={BOOKS_DATA} onBookClick={handleBookClick} />
            <div className="shelf">
              <img
                src="/images/woods.png"
                alt="Rak Buku"
                className="shelf-image"
              />
            </div>
          </div>
        </div>

        {/* <div className="bookshelf-container">
          <div className="bookshelf">
            <BookRow books={BOOKS_DATA_BOTTOM} onBookClick={handleBookClick} />
            <div className="shelf">
              <img
                src="/images/woods.png"
                alt="Rak Buku"
                className="shelf-image"
              />
            </div>
          </div>
        </div> */}
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

export default Galeri;

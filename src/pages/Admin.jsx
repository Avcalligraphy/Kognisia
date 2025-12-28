import React, { useState, useEffect } from "react";
import {
  subscribeToBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../firebase/booksService";
import "../style.css";

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    link: "",
    alt: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch books when category changes
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToBooks(selectedCategory, (booksData) => {
      setBooks(booksData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      image: "",
      link: "",
      alt: "",
    });
    setEditingBook(null);
    setIsModalOpen(false);
    setMessage({ type: "", text: "" });
  };

  const openAddModal = () => {
    setEditingBook(null);
    setFormData({
      image: "",
      link: "",
      alt: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      image: book.image || "",
      link: book.link || "",
      alt: book.alt || "",
    });
    setIsModalOpen(true);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image || !formData.link || !formData.alt) {
      showMessage("error", "Semua field harus diisi!");
      return;
    }

    try {
      if (editingBook) {
        // Update existing book
        await updateBook(selectedCategory, editingBook.id, formData);
        showMessage("success", "Buku berhasil diupdate!");
      } else {
        // Add new book
        await addBook(selectedCategory, formData);
        showMessage("success", "Buku berhasil ditambahkan!");
      }
      resetForm();
    } catch (error) {
      showMessage("error", "Terjadi kesalahan: " + error.message);
    }
  };

  const handleEdit = (book) => {
    openEditModal(book);
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      return;
    }

    try {
      await deleteBook(selectedCategory, bookId);
      showMessage("success", "Buku berhasil dihapus!");
    } catch (error) {
      showMessage("error", "Terjadi kesalahan: " + error.message);
    }
  };

  const categories = [
    { value: "home", label: "Home" },
    { value: "majalah", label: "Majalah" },
    { value: "galeri", label: "Galeri" },
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin - Kelola Buku</h1>
        <div className="category-selector">
          <label>Kategori: </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              resetForm();
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message.text && (
        <div className={`admin-message admin-message-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Books List */}
      <div className="admin-books-list">
        <div className="admin-books-header">
          <h2>Daftar Buku ({books.length})</h2>
          <button onClick={openAddModal} className="btn btn-primary">
            + Tambah Buku
          </button>
        </div>
        {isLoading ? (
          <div className="loading-text">Loading...</div>
        ) : books.length === 0 ? (
          <div className="empty-state">Belum ada buku di kategori ini.</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Gambar</th>
                  <th>Alt Text</th>
                  <th>Link</th>
                  <th>Tanggal Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="table-image-preview">
                        <img src={book.image} alt={book.alt} />
                      </div>
                    </td>
                    <td>
                      <div className="table-cell-content">{book.alt}</div>
                    </td>
                    <td>
                      <div className="table-cell-content table-link">
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={book.link}
                        >
                          {book.link.length > 50
                            ? book.link.substring(0, 50) + "..."
                            : book.link}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="table-cell-content">
                        {book.createdAt
                          ? new Date(book.createdAt).toLocaleDateString("id-ID")
                          : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(book)}
                          className="btn btn-edit btn-small"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn btn-delete btn-small"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={resetForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingBook ? "Edit Buku" : "Tambah Buku Baru"}</h2>
              <button
                type="button"
                onClick={resetForm}
                className="admin-modal-close"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="image">URL Gambar:</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">Link:</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com/flipbook"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt">Alt Text:</label>
                <input
                  type="text"
                  id="alt"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  placeholder="Nama Buku"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingBook ? "Update Buku" : "Tambah Buku"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

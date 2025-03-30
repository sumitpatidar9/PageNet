import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    rating: "",
    publishedDate: "",
  });
  const [editBook, setEditBook] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/user/books`, {
        withCredentials: true,
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/books/insert`, form, {
        withCredentials: true,
      });
      fetchBooks();
      setForm({
        title: "",
        author: "",
        category: "",
        price: "",
        rating: "",
        publishedDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${backendUrl}/books/${id}`, { withCredentials: true });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/books/${editBook._id}`, editBook, {
        withCredentials: true,
      });
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.dashboardTitle}>User Dashboard</h2>
        <form className={styles.bookForm} onSubmit={addBook}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      <div className={styles.booksSection}>
        <div className={styles.booksContainer}>
          {books.map((book) => (
            <div key={book._id} className={styles.bookCard}>
              <div className={styles.bookImage}></div>
              <div className={styles.bookDetails}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Category: {book.category}</p>
                <p>Price: ${book.price}</p>
                <p>Rating: {book.rating}</p>
                <p>Published: {book.publishedDate}</p>
                <div className={styles.bookActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => setEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editBook && (
        <div className={styles.editPopup}>
          <form className={styles.editForm} onSubmit={updateBook}>
            <input
              type="text"
              name="title"
              value={editBook.title}
              onChange={handleEditChange}
              required
            />
            <input
              type="text"
              name="author"
              value={editBook.author}
              onChange={handleEditChange}
              required
            />
            <input
              type="text"
              name="category"
              value={editBook.category}
              onChange={handleEditChange}
              required
            />
            <input
              type="number"
              name="price"
              value={editBook.price}
              onChange={handleEditChange}
              required
            />
            <input
              type="number"
              name="rating"
              value={editBook.rating}
              onChange={handleEditChange}
              required
            />
            <input
              type="date"
              name="publishedDate"
              value={editBook.publishedDate}
              onChange={handleEditChange}
              required
            />
            <button type="submit">Update Book</button>
            <button type="button" onClick={() => setEditBook(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export { Dashboard };
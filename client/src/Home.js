import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
import styles from "./home.module.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ author: "", category: "", minRating: "" });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const limit = 5;

  useEffect(() => {
    fetchBooks();
  }, [pagination.currentPage, sortBy, order]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books`, {
        params: {
          page: pagination.currentPage,
          limit: limit,
          sortBy: sortBy,
          order: order,
        },
      });
      setBooks(res.data.books);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books/search`, {
        params: {
          title: search,
          page: pagination.currentPage,
          limit: limit,
        },
      });
      setBooks(res.data.books);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books/filter`, {
        params: {
          ...filters,
          page: pagination.currentPage,
          limit: limit,
        },
      });
      setBooks(res.data.books);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleSortChange = (sortField) => {
    setSortBy(sortField);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.authButtons}>
        <Link to="/login" className={styles.authButton}>Login</Link>
        <Link to="/signup" className={styles.authButton}>Signup</Link>
      </div>
      <h2 className={styles.homeTitle}>Book Collection</h2>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.filterOptions}>
        <input
          type="text"
          placeholder="Filter by author"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className={styles.sortOptions}>
        <button onClick={() => handleSortChange("price")}>
          Sort by Price ({sortBy === "price" ? (order === "asc" ? "↑" : "↓") : ""})
        </button>
        <button onClick={() => handleSortChange("rating")}>
          Sort by Rating ({sortBy === "rating" ? (order === "asc" ? "↑" : "↓") : ""})
        </button>
      </div>
      <div className={styles.bookList}>
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
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={pagination.currentPage === page}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export { Home };
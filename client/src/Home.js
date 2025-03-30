


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";



const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ author: "", category: "", minRating: "" });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    fetchBooks();
  }, []);


  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleSearch = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books/search?title=${search}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const applyFilters = async () => {
    try {
      const res = await axios.get(`${backendUrl}/books/filter`, { params: filters });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="home-container">
      <h2 className="home-title">Book Collection</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter-options">
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
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-image"></div>
            <div className="book-details">
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
    </div>
  );
};

export {Home};
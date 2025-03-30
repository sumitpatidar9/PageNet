import { Router } from "express";
import { Home, Login, Signup, verifyToken, sendUser } from "../Controllers/User.js";
import {createBook,deleteBookById,updateBookById, getBooksAuth, getBooks, getBookById, getBookByFilter, query} 
from "../Controllers/Book.js";


const router = Router();


router.get('/home', Home);
router.post('/signup', Signup);
router.post('/login', Login);
router.get('/auth', verifyToken, sendUser);



router.post('/books/insert', verifyToken, createBook);
router.get('/user/books', verifyToken, getBooksAuth);


router.get('/books', getBooks);
router.get('/books/search', query);
router.get('/books/filter', getBookByFilter);

router.delete('/books/:id', verifyToken, deleteBookById);
router.get('/books/:id', getBookById);
router.put('/books/:id', verifyToken, updateBookById);


export {router}
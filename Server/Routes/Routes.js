import { Router } from "express";
import { Home, Login, Signup, verifyToken, sendUser } from "../Controllers/User.js";
import {createBook,deleteBookById,updateBookById, getBooksAuth} from "../Controllers/Book.js";


const router = Router();


router.get('/home', Home);
router.post('/signup', Signup);
router.post('/login', Login);
router.get('/auth', verifyToken, sendUser);

router.post('/books/insert', verifyToken, createBook);
router.get('/user/books', verifyToken, getBooksAuth);
router.put('/books/:id', verifyToken, updateBookById);
router.delete('/books/:id', verifyToken, deleteBookById);

export {router}
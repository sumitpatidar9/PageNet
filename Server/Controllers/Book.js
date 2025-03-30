import { User, Book } from "../Models/Model.js";


const createBook = async (req, res) => {

    try {
        const userId = res.locals.jwtData.id;
        const { title, author, category, price, rating, publishedDate } = req.body;
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" }); 
      
        const newBook = new Book({ 
            title, 
            author, 
            category, 
            price, 
            rating, 
            publishedDate,
            user: userId 
        });

        await newBook.save();
        
        res.status(201).json(newBook);
    } 

    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateBookById = async (req, res) => {
    try {
        const userId = res.locals.jwtData.id;
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        
        if (book.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this book" });
        }

        Object.assign(book, req.body);
        await book.save();

        res.json({ message: "Book updated successfully", book });
    } 

    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteBookById = async (req, res) => {
    try {

        const userId = res.locals.jwtData.id;
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        
        if (book.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this book" });
        }

        await Book.findByIdAndDelete(bookId);
        res.json({ message: "Book deleted successfully" });
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getBooksAuth = async (req, res) => {
    try {
        const userId = res.locals.jwtData.id;
        const books = await Book.find({ user: userId }).populate("user", "email");
        res.json(books);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};










const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("user", "email"); 
        res.json(books);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("user", "email");
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};




const getBookByFilter = async (req, res) => {
    try {
        const { author, category, minRating } = req.query;
        const filter = {};

        if (author) filter.author = author;
        if (category) filter.category = category;

        if (minRating && !isNaN(parseFloat(minRating))) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        const books = await Book.find(filter).populate("user", "email");
        res.json(books);
    } 
    
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};




const query = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) return res.status(400).json({ message: 'Title query parameter is required' });

        const books = await Book.find({ title: { $regex: title, $options: 'i' } }).populate("user", "email");
        res.json(books);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export {createBook,deleteBookById,updateBookById, getBooksAuth, getBooks, getBookById, getBookByFilter, query};
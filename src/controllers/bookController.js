const Book = require("../models/bookModel");


// POST → Add new book
const createBook = async (req, res) => {
  try {

    const book = await Book.create(req.body);

    res.status(201).json(book);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};


// GET → Get all books
const getBooks = async (req, res) => {
  try {

    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// GET → Book by ID
const getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// PUT → Update book
const updateBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};


// DELETE → Remove book
const deleteBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// SEARCH → By title
const searchBook = async (req, res) => {
  try {

    const title = req.query.title;

    const books = await Book.find({
      title: { $regex: title, $options: "i" }
    });

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBook
};
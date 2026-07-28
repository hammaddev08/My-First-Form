const bookModel = require('../models/models');

const getBooks = (req, res) => {
  res.json(bookModel);
};

const getBookById = (req, res) => {

  const id = Number(req.params.id);

  const book = bookModel.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);

};
const createBook = (req, res) => {

  const newBook = {
    id: bookModel.length + 1,
    title: req.body.title,
    description: req.body.description
  };

  bookModel.push(newBook);


  res.status(201).json(newBook);

};

const searchBook = (req, res) => {
  const { title, description } = req.query;

  let filteredBooks = bookModel;

  // Search by title
  if (title) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // Search by description
  if (description) {
    filteredBooks = filteredBooks.filter(book =>
      book.description.toLowerCase().includes(description.toLowerCase())
    );
  }

  // If no books found
  if (filteredBooks.length === 0) {
    return res.status(404).json({
      message: "No books found."
    });
  }

  res.status(200).json(filteredBooks);
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  searchBook
};
const bookModel = require('../model/model');

exports.getBooks = (req, res) => {
    res.json(bookModel);
  };

exports.getBookById = (req, res) => {

  const id = Number(req.params.id);

  const book = bookModel.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);

};

exports.createBook = (req, res) => {

  const newBook = {
    id: bookModel.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  bookModel.push(newBook);

  res.status(201).json(newBook);

};
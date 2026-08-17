const {bookModel,users} = require('../model/model');

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
    author: req.body.author
  };

  bookModel.push(newBook);

  res.status(201).json(newBook);

};
 const userVerification = (req,res) =>{
  const {email,password,id,name} = req.body;

  const user = users.find(user => user.email === email  && user.password === password && user.id ==id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }
  res.status(200).json({
    message: "User verified successfully"
  });
}


module.exports = { getBooks, getBookById, createBook,userVerification };
const routers = require('express');
const router = routers.Router();

const { getBooks, createBook, getBookById } = require('../controller/controller');

router.get('/books', getBooks);
router.post('/books', createBook);
router.get('/books/:id', getBookById);

module.exports = router;        
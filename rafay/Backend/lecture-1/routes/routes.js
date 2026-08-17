const routers = require('express');
const router = routers.Router();

const { getBooks, createBook, getBookById,userVerification } = require('../controller/controller');

router.get('/books', getBooks);
router.post('/books', createBook);
router.get('/books/:id', getBookById);
router.post('/verify-user', userVerification);

module.exports = router;        
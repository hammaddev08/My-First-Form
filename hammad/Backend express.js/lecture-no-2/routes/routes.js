const routers = require('express')
const router = routers.Router();

const bookController = require('../controller/controller');

router.get('/books', bookController.getBooks);
router.get('/books/search', bookController.searchBook);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);

module.exports = router
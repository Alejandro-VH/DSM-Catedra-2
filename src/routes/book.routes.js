const {Router} = require("express");

const { addBook, getBooks, getBook, updateBook, deleteBook, restoreBook } = require("../controllers/book.controller");
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

router.post("/add/book", validateJWT, addBook);

router.get("/books", validateJWT, getBooks);

router.get("/book/:id", validateJWT, getBook);

router.put("/book/:id", validateJWT, updateBook);

router.delete("/book/:id", validateJWT, deleteBook);

router.put("/restore/book/:id", validateJWT, restoreBook);

module.exports = router;
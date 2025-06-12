const Book = require('../models/book');

const addBook = async (req = request, res = response) => {
    try {
        const { title, author, genre, publication_date } = req.body;

        if (!title || !author || !genre || !publication_date) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });
        }

        const bookData = { title, author, genre, publication_date, available: true, deleted: false };

        const newBook = await Book.create(bookData);

        return res.status(201).json({
            success: true,
            error: false,
            data: newBook,
            message: "Libro creado exitosamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al registrar el libro",
        });
    }
}

const getBooks = async (req = request, res = response) => {
    try {
        const books = await Book.findAll({
            where: { deleted: false },
        });

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron libros",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Libro encontrado exitosamente",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al conseguir libros",
        });
    }
}

const getBook = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({
            where: { id, deleted: false }
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el libro indicado",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Libro encontrado exitosamente",
            data: book
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al conseguir el libro",
        });
    }
}

const updateBook = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publication_date, available } = req.body;
        // Feo pero funcional
        if (title === undefined && author === undefined && genre === undefined && publication_date === undefined && available === undefined) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar al menos un campo para actualizar un libro",
            });
        }

        const book = await Book.findOne({ where: { id, deleted: false } });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el libro indicado",
            });
        }

        // Revisamos si el campo de la request tiene un valor
        if (title !== undefined) {
            book.title = title;
        }
        if (author !== undefined) {
            book.author = author;
        }
        if (genre !== undefined) {
            book.genre = genre;
        }
        if (publication_date !== undefined) {
            book.publication_date = publication_date;
        }
        if (available !== undefined) {
            book.available = available;
        }

        // Actualizamos la fecha de actualización
        book.updatedAt = new Date();

        await book.save();

        return res.status(200).json({
            success: true,
            message: "Libro actualizado correctamente",
            data: book
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al actualizar el libro",
        });
    }
}

const deleteBook = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({ where: { id, deleted: false } });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el libro indicado",
            });
        }

        book.deleted = true;
        await book.save();

        return res.status(200).json({
            success: true,
            message: "Libro eliminado correctamente",

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al eliminar el libro",
        });
    }
}

const restoreBook = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({ where: { id, deleted: true } });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "El libro indicado no existe o no está eliminado",
            });
        }

        book.deleted = false;
        await book.save();

        return res.status(200).json({
            success: true,
            message: "Libro restaurado correctamente",
            data: book
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al restaurar el libro",
        });
    }
}

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    restoreBook
};
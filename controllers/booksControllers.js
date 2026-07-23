import {
  getAllAuthors,
  getAllCategories,
  getAllBooks,
  getAllpublishers,
  checkISBMisUnique,
  insertIntoBookDB,
  deleteFromBooksdb,
  getBookByIdFromdb,
  updateBookInDb,
} from "../models/queries.js";

import { categoriesById } from "../models/categoriesQueries.js";
import { publisherById } from "../models/publisherQueries.js";
import { authorById } from "../models/authorQueries.js";

import { body, validationResult, matchedData } from "express-validator";

const validateBook = [
  // Title
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Title must be between 2 and 150 characters."),

  // ISBN
  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required.")
    .isISBN()
    .withMessage("Please enter a valid ISBN.")
    .custom(async (isbn, { req }) => {
      return await checkISBMisUnique(isbn, req.params.id);
    }),
  // Language
  body("language")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Language cannot exceed 30 characters."),

  // Edition
  body("edition")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Edition cannot exceed 50 characters."),

  // Price
  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),

  // Quantity
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer."),

  // Description
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  // Category
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Please select a category.")
    .isInt({ min: 1 })
    .withMessage("Invalid category."),

  // Author
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Please select an author.")
    .isInt({ min: 1 })
    .withMessage("Invalid author."),

  // Publisher
  body("publisher")
    .trim()
    .notEmpty()
    .withMessage("Please select a publisher.")
    .isInt({ min: 1 })
    .withMessage("Invalid publisher."),
];

async function openAddBook(req, res) {
  const categories = await getAllCategories();
  const authors = await getAllAuthors();
  const publishers = await getAllpublishers();
  const title = "ADD THE BOOK";
  res.render("books/addBooks", {
    title,
    categories,
    authors,
    publishers,
    book: null,
    isEdit: false,
  });
}

const addBookIndb = [
  ...validateBook,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await getAllCategories();
      const authors = await getAllAuthors();
      const publishers = await getAllpublishers();
      const isEdit = Boolean(req.params.id);
      const title = isEdit ? "EDIT THE BOOK" : "ADD THE BOOK";
      return res.status(400).render("./books/addBooks", {
        title,
        errors: errors.array(),
        categories,
        authors,
        publishers,
        book: req.body,
        isEdit: false,
      });
    }

    const book = matchedData(req);
    if (req.params.id) {
      await updateBookInDb(req.params.id, book);
    } else {
      await insertIntoBookDB(book);
    }
    res.redirect("/");
  },
];

async function showBookList(req, res) {
  const booksList = await getAllBooks();

  await Promise.all(
    booksList.map(async (book) => {
      book.categoryName = await categoriesById(book.category_id);
      book.authorName = await authorById(book.author_id);
      book.publisherName = await publisherById(book.publisher_id);
    }),
  );
  res.render("./books/bookList.ejs", { booksList });
}

async function deleteBookById(req, res) {
  const { id } = req.params;
  await deleteFromBooksdb(id);
  res.redirect("/books");
}

async function openEditPage(req, res) {
  const { id } = req.params;
  const categories = await getAllCategories();
  const authors = await getAllAuthors();
  const publishers = await getAllpublishers();
  const book = await getBookByIdFromdb(id);
  const title = "EDIT THE BOOK";
  res.render("books/addBooks", {
    title,
    categories,
    authors,
    publishers,
    book,
    isEdit: true,
  });
}
export { openAddBook, addBookIndb, showBookList, deleteBookById, openEditPage };

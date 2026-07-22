import {
  getAllAuthors,
  getAllCategories,
  getAllBooks,
  getAllpublishers,
  checkISBMisUnique,
  insertIntoBookDB,
} from "../models/queries.js";
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
    .custom(checkISBMisUnique),
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
  res.render("books/addBooks", { categories, authors, publishers });
}

const addBookIndb = [
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  ...validateBook,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await getAllCategories();
      const authors = await getAllAuthors();
      const publishers = await getAllpublishers();
      return res.status(400).render("./books/addBooks", {
        errors: errors.array(),
        data: req.body, // Optional: preserve entered values
        categories,
        authors,
        publishers,
      });
    }

    const book = matchedData(req);

    await insertIntoBookDB(book);

    res.redirect("/");
  },
];

export { openAddBook, addBookIndb };

import { insertIntoCategoryDB } from "../models/categoriesQueries.js";
import { body, validationResult, matchedData } from "express-validator";

const validateBook = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Title must be between 2 and 150 characters."),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),
];

function openAddCategories(req, res) {
  res.render("./categories/addCategory");
}

const addCategoryIndb = [
  ...validateBook,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("./books/addBooks", {
        errors: errors.array(),
        data: req.body, // Optional: preserve entered values
      });
    }

    const { name, description } = matchedData(req);

    await insertIntoCategoryDB(name, description);

    res.redirect("/");
  },
];

export { openAddCategories, addCategoryIndb };

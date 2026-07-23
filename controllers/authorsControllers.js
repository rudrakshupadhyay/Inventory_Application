import {
  insertIntoAuthorsdb,
  updateAuthorIndb,
  getAllAuthors,
  authorById,
  deleteFromAuthorsdb,
} from "../models/authorQueries.js";

import { body, validationResult, matchedData } from "express-validator";

const validateAuthors = [
  // First Name (Required)
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters.")
    .matches(/^[A-Za-z\s'-]+$/)
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes.",
    ),

  // Last Name (Optional)
  body("last_name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s'-]+$/)
    .withMessage(
      "Last name can only contain letters, spaces, hyphens, and apostrophes.",
    ),

  // About (Optional)
  body("about")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("About cannot exceed 1000 characters."),
];

export const addAuthorsIndb = [
  ...validateAuthors,
  async (req, res) => {
    const errors = validationResult(req);
    const isEdit = Boolean(req.params.id);
    const title = isEdit ? "EDIT THE Author" : "ADD THE Author";
    if (!errors.isEmpty()) {
      return res.status(400).render("./authors/addAuthors", {
        title,
        errors: errors.array(),
        author: req.body, // Optional: preserve entered values
      });
    }

    const { first_name, last_name, about } = matchedData(req);
    if (req.params.id) {
      await updateAuthorIndb(req.params.id, first_name, last_name, about);
    } else {
      await insertIntoAuthorsdb(first_name, last_name, about);
    }
    res.redirect("/");
  },
];

export async function openAuthorsList(req, res) {
  const authors = await getAllAuthors();
  res.render("authors/authorsList", { authors });
}

export async function deleteAuthorById(req, res) {
  const { id } = req.params;
  await deleteFromAuthorsdb(id);
  res.redirect("/authors");
}

export async function openEditPageOfAuthor(req, res) {
  const { id } = req.params;
  const author = await authorById(id);
  const title = "EDIT THE Author";
  res.render("authors/addAuthors", {
    title,
    author,
  });
}

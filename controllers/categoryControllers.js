import {
  insertIntoCategoryDB,
  getAllCategories,
  updateCategoryIndb,
  deleteFromCategoriesdb,
  categoriesById,
  isCategoryNameUnique,
} from "../models/categoriesQueries.js";
import { body, validationResult, matchedData } from "express-validator";

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Title must be between 2 and 150 characters.")
    .custom(isCategoryNameUnique),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),
];

export const addCategoryIndb = [
  ...validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const isEdit = Boolean(req.params.id);
    const title = isEdit ? "EDIT THE category" : "ADD THE category";
    if (!errors.isEmpty()) {
      return res.status(400).render("./categories/addCategory", {
        title,
        isEdit: false,
        errors: errors.array(),
        category: req.body, // Optional: preserve entered values
      });
    }

    const { name, description } = matchedData(req);
    if (req.params.id) {
      await updateCategoryIndb(req.params.id, name, description);
    } else {
      await insertIntoCategoryDB(name, description);
    }
    res.redirect("/");
  },
];

export async function openCategoriesList(req, res) {
  const categories = await getAllCategories();
  res.render("categories/categoriesList", { categories });
}

export async function deleteCategoryById(req, res) {
  const { id } = req.params;
  await deleteFromCategoriesdb(id);
  res.redirect("/categories");
}

export async function openEditPageOfCategory(req, res) {
  const { id } = req.params;
  const category = await categoriesById(id);
  const title = "EDIT THE BOOK"; 
  res.render("categories/addCategory", {
    isEdit:true,
    title,
    category,
  });
}

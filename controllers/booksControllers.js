import {
  getAllAuthors,
  getAllCategories,
  getAllBooks,
  getAllpublishers,
} from "../models/queries.js";

async function openAddBook(req, res) {
  const categories = await getAllCategories();
  const authors = await getAllAuthors();
  const publishers = await getAllpublishers();
  res.render("books/addBooks", { categories, authors, publishers });
}

export { openAddBook };

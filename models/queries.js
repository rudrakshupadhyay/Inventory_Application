import pool from "./pool.js";

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllAuthors() {
  const { rows } = await pool.query("SELECT * FROM authors");
  return rows;
}

async function getAllpublishers() {
  const { rows } = await pool.query("SELECT * FROM publishers");
  return rows;
}
export { getAllAuthors, getAllCategories, getAllBooks, getAllpublishers };

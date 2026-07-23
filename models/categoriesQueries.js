import pool from "./pool.js";

export async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

export async function insertIntoCategoryDB(name, description) {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1,$2)",
    [name, description],
  );
}

export async function deleteFromCategoriesdb(value) {
  await pool.query("DELETE FROM categories WHERE id = $1",[value])
}

export async function categoriesById(value) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    value,
  ]);
  return rows[0];
}

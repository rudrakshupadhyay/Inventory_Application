import pool from "./pool.js";

export async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

export async function categoriesById(value) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    value,
  ]);
  return rows[0];
}

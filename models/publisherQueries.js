import pool from "./pool.js";

export async function publisherById(value) {
  const { rows } = await pool.query("SELECT * FROM publishers WHERE id = $1",[value]);
  return rows[0];
}

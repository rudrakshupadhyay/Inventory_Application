import pool from "./pool.js";

export async function authorById(value) {
  const { rows } = await pool.query("SELECT * FROM authors  WHERE id = $1",[value]);
  return rows[0];
}

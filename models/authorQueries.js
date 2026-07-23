import pool from "./pool.js";

export async function getAllAuthors() {
  const { rows } = await pool.query("SELECT * FROM authors");
  return rows;
}


export async function authorById(value) {
  const { rows } = await pool.query("SELECT * FROM authors  WHERE id = $1", [
    value,
  ]);
  return rows[0];
}

export async function insertIntoAuthorsdb(first_name, last_name, about) {
  await pool.query(
    "INSERT INTO authors (first_name,last_name, about) VALUES ($1,$2,$3)",
    [first_name, last_name, about],
  );
}

export async function deleteFromAuthorsdb(value) {
  await pool.query("DELETE FROM authors WHERE id = $1", [value]);
}

export async function updateAuthorIndb(id, first_name, last_name, about) {
  await pool.query(
    `
    UPDATE authors
    SET
      first_name = $1,
      last_name = $2,
      about = $3
    WHERE id = $4
    `,
    [first_name, last_name, about, id],
  );
}

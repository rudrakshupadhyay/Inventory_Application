import pool from "./pool.js";

export async function getAllPublishers() {
  const { rows } = await pool.query("SELECT * FROM publishers");
  return rows;
}

export async function publisherById(value) {
  const { rows } = await pool.query("SELECT * FROM publishers WHERE id = $1", [
    value,
  ]);
  return rows[0];
}

export async function insertIntoPublishersdb(name, country, website) {
  await pool.query(
    "INSERT INTO publishers (name, country, website) VALUES ($1,$2,$3)",
    [name, country, website],
  );
}

export async function updatePublisherIndb(id, name, country, website) {
  await pool.query(
    `
    UPDATE publishers
    SET
      name = $1,
      country = $2,
      website = $3
    WHERE id = $4
    `,
    [name, country, website, id],
  );
}

export async function deleteFromPublishersdb(value) {
  await pool.query("DELETE FROM publishers WHERE id = $1", [value]);
}

export async function isPublisherNameUnique(name) {
  const { rows } = await pool.query(
    "SELECT id FROM publishers WHERE LOWER(name) = LOWER($1)",
    [name]
  );

  if (rows.length > 0) {
    throw new Error("Publisher name already exists.");
  }

  return true;
}

export async function isPublisherWebsiteUnique(website) {
  if (!website) return true; // optional field

  const { rows } = await pool.query(
    "SELECT id FROM publishers WHERE website = $1",
    [website]
  );

  if (rows.length > 0) {
    throw new Error("Website already exists.");
  }

  return true;
}
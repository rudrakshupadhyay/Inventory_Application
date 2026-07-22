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

async function insertIntoBookDB(book) {
  const {
    title,
    isbn,
    language,
    edition,
    price,
    quantity,
    description,
    category,
    author,
    publisher,
  } = book;

  await pool.query(
    `INSERT INTO books
      (title, isbn, language, edition, price, quantity, description,
       category_id, author_id, publisher_id)
     VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      title,
      isbn,
      language,
      edition,
      price,
      quantity,
      description,
      category,
      author,
      publisher,
    ],
  );
}

async function checkISBMisUnique(value) {
  const result = await pool.query("SELECT id FROM books WHERE isbn = $1", [
    value,
  ]);

  if (result.rows.length > 0) {
    throw new Error("ISBN already exists.");
  }

  return true;
}

export {
  getAllAuthors,
  getAllCategories,
  getAllBooks,
  getAllpublishers,
  checkISBMisUnique,
  insertIntoBookDB,
};

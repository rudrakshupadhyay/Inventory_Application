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

async function checkISBMisUnique(isbn, bookId) {
  let result;
  if (bookId) {
    result = await pool.query(
      `
      SELECT id
      FROM books
      WHERE isbn = $1
        AND id != $2
      `,
      [isbn, bookId],
    );
  } else {
    result = await pool.query(
      `
      SELECT id
      FROM books
      WHERE isbn = $1
      `,
      [isbn],
    );
  }
  if (result.rows.length > 0) {
    throw new Error("ISBN already exists.");
  }
  return true;
}

async function deleteFromBooksdb(value) {
  await pool.query("DELETE FROM books WHERE id = $1", [value]);
}

async function getBookByIdFromdb(value) {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [
    value,
  ]);
  return rows[0];
}

async function updateBookInDb(id, book) {
  await pool.query(
    `
    UPDATE books
    SET
      title = $1,
      isbn = $2,
      language = $3,
      edition = $4,
      price = $5,
      quantity = $6,
      description = $7,
      category_id = $8,
      author_id = $9,
      publisher_id = $10
    WHERE id = $11
    `,
    [
      book.title,
      book.isbn,
      book.language,
      book.edition,
      book.price,
      book.quantity,
      book.description,
      book.category,
      book.author,
      book.publisher,
      id,
    ],
  );
}

export {
  getAllAuthors,
  getAllCategories,
  getAllBooks,
  getAllpublishers,
  checkISBMisUnique,
  insertIntoBookDB,
  deleteFromBooksdb,
  getBookByIdFromdb,
  updateBookInDb,
};

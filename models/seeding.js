import { Client } from "pg";
import { loadEnvFile } from "node:process";

if (!process.env.RENDER) {
  loadEnvFile();
}

const SQL = `
BEGIN;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS publishers CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE authors (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    about TEXT
);

CREATE TABLE publishers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL,
    website VARCHAR(255) UNIQUE
);

CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    isbn VARCHAR(25) UNIQUE NOT NULL,
    language VARCHAR(50) DEFAULT 'English',
    edition VARCHAR(30),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    publisher_id INTEGER NOT NULL REFERENCES publishers(id) ON DELETE CASCADE
);
-- Categories
INSERT INTO categories (name, description)
VALUES
('Programming', 'Books about programming and software development'),
('Database', 'Books about SQL and database systems'),
('Fiction', 'Novels and fictional stories');

-- Authors
INSERT INTO authors (first_name, last_name, about)
VALUES
('Robert', 'Martin', 'Software engineer and author of Clean Code'),
('Martin', 'Kleppmann', 'Author of Designing Data-Intensive Applications'),
('George', 'Orwell', 'English novelist');

-- Publishers
INSERT INTO publishers (name, country, website)
VALUES
('Prentice Hall', 'USA', 'https://www.pearson.com'),
('O''Reilly Media', 'USA', 'https://www.oreilly.com'),
('Penguin Books', 'United Kingdom', 'https://www.penguin.co.uk');
INSERT INTO books (
    title,
    isbn,
    language,
    edition,
    price,
    quantity,
    description,
    category_id,
    author_id,
    publisher_id
)
VALUES
(
    'Clean Code',
    '9780132350884',
    'English',
    '1st',
    45.99,
    10,
    'A handbook of agile software craftsmanship.',
    1,
    1,
    1
),
(
    'Designing Data-Intensive Applications',
    '9781449373320',
    'English',
    '1st',
    59.99,
    5,
    'Guide to modern data systems.',
    2,
    2,
    2
),
(
    '1984',
    '9780451524935',
    'English',
    '1st',
    15.99,
    20,
    'Classic dystopian novel.',
    3,
    3,
    3
);
COMMIT;
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.RENDER ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log("Seeding database...");
    await client.connect();
    await client.query(SQL);
    console.log("Done.");
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}
main();

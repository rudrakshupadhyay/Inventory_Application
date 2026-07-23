import { getAllAuthors } from "../models/authorQueries.js";
import { getAllCategories } from "../models/categoriesQueries.js";
import { getAllPublishers } from "../models/publisherQueries.js";
import { getAllBooks } from "../models/queries.js";

export async function openHomePage(req, res) {
  const numBooks = (await getAllBooks()).length;
  const numCategories = (await getAllCategories()).length;
  const numAuthoes = (await getAllAuthors()).length;
  const numPublisher = (await getAllPublishers()).length;
  res.render("home", { numBooks, numCategories, numAuthoes, numPublisher });
}

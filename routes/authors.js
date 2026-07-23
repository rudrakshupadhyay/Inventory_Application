import { Router } from "express";
import {
  addAuthorsIndb,
  openAuthorsList,
  deleteAuthorById,
  openEditPageOfAuthor,
} from "../controllers/authorsControllers.js";
const authorRouter = Router();

authorRouter.get("/", openAuthorsList);
authorRouter.get("/add", (req, res) => {
  const title = "ADD THE AUTHOR";
  res.render("authors/addAuthors", { title, author: null });
});
authorRouter.delete("/:id", deleteAuthorById);
authorRouter.post("/add", addAuthorsIndb);
authorRouter.get("/:id/edit", openEditPageOfAuthor);
authorRouter.post("/:id/edit", addAuthorsIndb);
export default authorRouter;

import { Router } from "express";
import {
  openAddBook,
  addBookIndb,
  showBookList,
  deleteBookById,
  openEditPage,
} from "../controllers/booksControllers.js";

const bookRouter = Router();

bookRouter.get("/", showBookList);
bookRouter.get("/add", openAddBook);
bookRouter.post("/add", addBookIndb);
bookRouter.delete("/:id", deleteBookById);
bookRouter.get("/:id/edit", openEditPage);
bookRouter.post("/:id/edit", addBookIndb);
export default bookRouter;

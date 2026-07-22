import { Router } from "express";
import {
  openAddBook,
  addBookIndb,
  showBookList,
} from "../controllers/booksControllers.js";

const bookRouter = Router();
bookRouter.get("/", showBookList);
bookRouter.get("/add", openAddBook);
bookRouter.post("/add", addBookIndb);

export default bookRouter;

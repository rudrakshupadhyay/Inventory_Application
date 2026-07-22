import { Router } from "express";
import { openAddBook, addBookIndb } from "../controllers/booksControllers.js";

const bookRouter = Router();

bookRouter.get("/add", openAddBook);
bookRouter.post("/add", addBookIndb);

export default bookRouter;

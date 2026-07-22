import { Router } from "express";
import { openAddBook } from "../controllers/booksControllers.js";

const bookRouter = Router();

bookRouter.get("/add", openAddBook);

export default bookRouter;

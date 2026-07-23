import { Router } from "express";
import {
  openAddCategories,
  addCategoryIndb,
} from "../controllers/categoryControllers.js";
const categoryRouter = Router();

categoryRouter.get("/add", openAddCategories);
categoryRouter.post("/add", addCategoryIndb);
export default categoryRouter;

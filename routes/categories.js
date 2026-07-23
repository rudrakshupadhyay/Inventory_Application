import { Router } from "express";
import {
  addCategoryIndb,
  openCategoriesList,
  deleteCategoryById,
  openEditPageOfCategory,
} from "../controllers/categoryControllers.js";
const categoryRouter = Router();

categoryRouter.get("/", openCategoriesList);

categoryRouter.get("/add", (req, res) => {
  const title = "ADD THE CATEGORY";
  res.render("./categories/addCategory", { title, category: null });
});
categoryRouter.post("/add", addCategoryIndb);
categoryRouter.get("/:id/edit", openEditPageOfCategory);
categoryRouter.post("/:id/edit", addCategoryIndb);
categoryRouter.delete("/:id", deleteCategoryById);
export default categoryRouter;

import { Router } from "express";
import {
  addPublisherIndb,
  openPublishersList,
  openEditPageOfPublisher,
  deletePublisherById,
} from "../controllers/publishersControllers.js";
const publisherRouter = Router();

publisherRouter.get("/", openPublishersList);

publisherRouter.get("/add", (req, res) => {
  const title = "ADD THE PUBLISHER";
  res.render("publishers/addPublishers", {
    isEdit: false,
    title,
    publisher: null,
  });
});

publisherRouter.post("/add", addPublisherIndb);
publisherRouter.get("/:id/edit", openEditPageOfPublisher);
publisherRouter.post("/:id/edit", addPublisherIndb);
publisherRouter.delete("/:id", deletePublisherById);
export default publisherRouter;

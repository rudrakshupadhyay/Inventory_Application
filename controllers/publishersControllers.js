import {
  updatePublisherIndb,
  insertIntoPublishersdb,
  getAllPublishers,
  publisherById,
  deleteFromPublishersdb,
  isPublisherNameUnique,
  isPublisherWebsiteUnique,
} from "../models/publisherQueries.js";
import { body, validationResult, matchedData } from "express-validator";

const validatePublishers = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Name must be between 2 and 150 characters.")
    .custom(isPublisherNameUnique),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required")
    .matches(/^[A-Za-z\s'-]+$/)
    .withMessage("Invalid country name"),

  body("website")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Please enter a valid website URL")
    .custom(isPublisherWebsiteUnique),
];

export const addPublisherIndb = [
  ...validatePublishers,
  async (req, res) => {
    const errors = validationResult(req);
    const isEdit = Boolean(req.params.id);
    const title = isEdit ? "EDIT THE Publisher" : "ADD THE Publisher";
    if (!errors.isEmpty()) {
      return res.status(400).render("./publishers/addPublishers", {
        isEdit: false,
        title,
        errors: errors.array(),
        publisher: req.body, // Optional: preserve entered values
      });
    }

    const { name, country, website } = matchedData(req);
    if (req.params.id) {
      await updatePublisherIndb(req.params.id, name, country, website);
    } else {
      await insertIntoPublishersdb(name, country, website);
    }
    res.redirect("/");
  },
];

export async function openPublishersList(req, res) {
  const publishers = await getAllPublishers();
  res.render("publishers/publishersList", { publishers });
}

export async function openEditPageOfPublisher(req, res) {
  const { id } = req.params;
  const publisher = await publisherById(id);
  const title = "EDIT THE Publisher";
  res.render("publishers/addPublishers", {
    isEdit: true,
    title,
    publisher,
  });
}

export async function deletePublisherById(req, res) {
  const { id } = req.params;
  await deleteFromPublishersdb(id);
  res.redirect("/publishers");
}

import express from "express";
import path from "node:path";
import methodOverride from "method-override";
import authorRouter from "./routes/authors.js";
import bookRouter from "./routes/books.js";
import categoryRouter from "./routes/categories.js";
import publisherRouter from "./routes/publishers.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/publishers", publisherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

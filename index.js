const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3030;

const app = express();

const userRoutes = require("./routes/users");
const finishedBookRoutes = require("./routes/finishedbooks");
const readingBookRoutes = require("./routes/readingbooks");
const highlightRoutes = require("./routes/highlights");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Library API" });
});

app.use("/api/users", userRoutes);
app.use("/api/finishedbooks", finishedBookRoutes);
app.use("/api/readingbooks", readingBookRoutes);
app.use("/api/highlights", highlightRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`server listening on port ${port}`));

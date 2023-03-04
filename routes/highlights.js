const express = require("express");
const router = express.Router();
const multer = require("multer");
const toJSON = require("../lib/highlights-to-json");
const prisma = require("../lib/prisma");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// get all highlights
router.get("/", async (req, res) => {
  const highlights = await prisma.highlight.findMany();
  res.json(highlights);
});

// get highlight with id
router.get("/highlight/:id", async (req, res) => {
  const { id } = req.params;
  const highlight = await prisma.highlight.findUnique({
    where: { id: Number(id) },
  });
  res.json(highlight);
});

// get highlights for finished book with finishedBookId
router.get("/finishedbook/:finishedBookId", async (req, res) => {
  const { finishedBookId } = req.params;
  const highlights = await prisma.highlight.findMany({
    where: { finishedBookId: Number(finishedBookId) },
  });
  res.json(highlights);
});

// get some random highlights
router.get("/random/:count", async (req, res) => {
  const { count } = req.params;
  const highlights = await prisma.highlight.findMany({
    include: { finishedBook: true },
  });
  const shuffledHighlights = highlights.sort(() => 0.5 - Math.random());
  const randomHighlights = shuffledHighlights.slice(0, count);
  res.json(randomHighlights);
});

// search highlights with query
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const highlights = await prisma.highlight.findMany({
    where: {
      content: {
        search: q.replace(/[\s\n\t]/g, "_"),
      },
    },
    include: { finishedBook: true },
  });
  res.json(highlights);
});

// upload highlights for a finished book
router.post("/upload", upload.single("highlights-file"), async (req, res) => {
  highlightsJSON = await toJSON(String(req.file.buffer));
  const finishedBookId = Number(req.body.finishedBookId);
  const data = [];
  highlightsJSON.highlights.forEach((highlight) => {
    data.push({
      finishedBookId,
      color: highlight.color,
      content: highlight.content,
      location: Number(highlight.location),
    });
  });
  await prisma.highlight.createMany({
    data: data,
  });
  res.json({ finishedBookId });
});

module.exports = router;

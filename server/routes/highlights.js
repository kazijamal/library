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
router.get("/:id", async (req, res) => {
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

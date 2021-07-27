const express = require("express");
const router = express.Router();
const multer = require("multer");
const toJSON = require("../lib/highlights-to-json");
const prisma = require("../lib/prisma");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get("/", async (req, res) => {
	const highlights = await prisma.highlight.findMany();
	res.json(highlights);
});

router.post("/upload", upload.single("highlights-file"), async (req, res) => {
	highlightsJSON = await toJSON(String(req.file.buffer));
	console.log(highlightsJSON);
});

module.exports = router;

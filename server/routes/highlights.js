const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
	const highlights = await prisma.highlight.findMany();
	res.json(highlights);
});

module.exports = router;

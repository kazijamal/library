const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// get all finished books
router.get("/", async (req, res) => {
	const finishedBooks = await prisma.finishedBook.findMany();
	res.json(finishedBooks);
});

// get finished book with id
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const finishedBook = await prisma.finishedBook.findUnique({
		where: { id: Number(id) },
	});
	res.json(finishedBook);
});

// create new finished book
router.post("/", async (req, res) => {
	const { title } = req.body;
	const finishedBook = await prisma.finishedBook.create({
		data: {
			title: title,
		},
	});
	res.json(finishedBook);
});

// delete finished book with id
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const finishedBook = await prisma.finishedBook.delete({
		where: {
			id: Number(id),
		},
	});
	res.json(finishedBook);
});

module.exports = router;

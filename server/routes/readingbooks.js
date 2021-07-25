const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// get all reading books
router.get("/", async (req, res) => {
	const readingBooks = await prisma.readingBook.findMany();
	res.json(readingBooks);
});

// get reading book with id
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const readingBook = await prisma.readingBook.findUnique({
		where: { id: Number(id) },
	});
	res.json(readingBook);
});

// delete reading book with id and make finished book with same data
router.patch("/markfinished/:id", async (req, res) => {
	const { id } = req.params;
	const readingBook = await prisma.readingBook.delete({
		where: {
			id: Number(id),
		},
	});
	const finishedBook = await prisma.finishedBook.create({
		data: {
			title: readingBook.title,
		},
	});
	res.json(finishedBook);
});

// create new reading book
router.post("/", async (req, res) => {
	const { title } = req.body;
	const result = await prisma.readingBook.create({
		data: {
			title: title,
		},
	});
	res.json(result);
});

// delete reading book with id
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const readingBook = await prisma.readingBook.delete({
		where: {
			id: Number(id),
		},
	});
	res.json(readingBook);
});

module.exports = router;

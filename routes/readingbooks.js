const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const axios = require("axios");
const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;

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
			volumeId: readingBook.volumeId,
			subtitle: readingBook.subtitle,
			authors: readingBook.authors,
			description: readingBook.description,
			pageCount: readingBook.pageCount,
			categories: readingBook.categories,
			imageLink: readingBook.imageLink,
		},
	});
	res.json(finishedBook);
});

// create new reading book
router.post("/", async (req, res) => {
	const { title } = req.body;
	const googleBooksResponse = await axios.get(
		`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${googleBooksAPIKey}`
	);
	const volume = googleBooksResponse.data.items[0];
	const volumeId = volume.id;
	const volumeTitle = volume.volumeInfo.title;
	const imageLink = volume.volumeInfo.imageLinks.thumbnail;
	const { subtitle, authors, description, pageCount, categories } =
		volume.volumeInfo;
	const readingBook = await prisma.readingBook.create({
		data: {
			title: volumeTitle,
			volumeId: volumeId,
			subtitle: subtitle,
			authors: authors,
			description: description,
			pageCount: pageCount,
			categories: categories,
			imageLink: imageLink,
		},
	});
	res.json(readingBook);
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

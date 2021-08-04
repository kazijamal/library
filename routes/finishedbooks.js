const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const axios = require("axios");
const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;

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
	const googleBooksResponse = await axios.get(
		`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${googleBooksAPIKey}`
	);
	const volume = googleBooksResponse.data.items[0];
	const volumeId = volume.id;
	const volumeTitle = volume.volumeInfo.title;
	const imageLink = volume.volumeInfo.imageLinks.thumbnail;
	const { subtitle, authors, description, pageCount, categories } =
		volume.volumeInfo;
	const finishedBook = await prisma.finishedBook.create({
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
	res.json(finishedBook);
});

// delete finished book with id
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await prisma.highlight.deleteMany({
		where: {
			finishedBookId: Number(id),
		},
	});
	const finishedBook = await prisma.finishedBook.delete({
		where: {
			id: Number(id),
		},
	});
	res.json(finishedBook);
});

module.exports = router;

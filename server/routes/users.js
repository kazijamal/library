const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

router.post("/login", async (req, res) => {
	const token = {
		token: "test123",
	};
	res.json(token);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

module.exports = router;

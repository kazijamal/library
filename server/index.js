const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	async function main() {
		const allUsers = await prisma.user.findMany();
		res.send(allUsers);
	}

	main()
		.catch((e) => {
			throw e;
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
});

app.listen(3030, () => console.log("server listening on port 3030"));

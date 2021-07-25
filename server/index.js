import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(3030, () => console.log("server listening on port 3030"));

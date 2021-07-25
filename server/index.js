const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Library API" });
});

// Use routes imported from routes directory
app.use("/users", userRoutes);

// Not found errors for undefined routes
app.use((req, res, next) => {
	res.status(404).json({
		status: 404,
		error: "Not found",
	});
});

// Internal server errors
app.use((error, req, res, next) => {
	console.error(error.stack);
	res.status(500).json({
		status: 500,
		error: "Internal server error",
	});
});

app.listen(3030, () => console.log("server listening on port 3030"));

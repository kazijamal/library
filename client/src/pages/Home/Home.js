import React from "react";
import { Link } from "react-router-dom";
import ReadingBookList from "../../components/Home/ReadingBookList/ReadingBookList";
import FinishedBookList from "../../components/Home/FinishedBookList/FinishedBookList";
import { Typography, Button } from "@material-ui/core";

function Home() {
	return (
		<div>
			<Typography variant="h3">Home</Typography>
			<Button variant="contained" color="primary" component={Link} to="/login">
				Log In
			</Button>
			<ReadingBookList />
			<FinishedBookList />
		</div>
	);
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import ReadingBookList from "../../components/Home/ReadingBookList/ReadingBookList";
import FinishedBookList from "../../components/Home/FinishedBookList/FinishedBookList";

function Home() {
	return (
		<div>
			<Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Log In</Link>
			<ReadingBookList />
			<FinishedBookList />
		</div>
	);
}

export default Home;

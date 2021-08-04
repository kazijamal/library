import React from "react";
import { Link } from "react-router-dom";
import ReadingBookList from "../../components/Dashboard/ReadingBookList/ReadingBookList";
import FinishedBookList from "../../components/Dashboard/FinishedBookList/FinishedBookList";

function Dashboard() {
	const handleLogout = () => {
		localStorage.clear();
		window.location.pathname = "/";
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<button onClick={handleLogout}>Log Out</button>
			<ReadingBookList />
			<Link to="/dashboard/readingbooks/add">Add Reading Book</Link>
			<FinishedBookList />
			<Link to="/dashboard/finishedbooks/add">Add Finished Book</Link>
		</div>
	);
}

export default Dashboard;

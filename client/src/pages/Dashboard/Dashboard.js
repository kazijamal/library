import React, { useState, useEffect } from "react";
import ReadingBookList from "../../components/Dashboard/ReadingBookList/ReadingBookList";
import NewReadingBookForm from "../../components/Dashboard/NewReadingBookForm/NewReadingBookForm";
import FinishedBookList from "../../components/Dashboard/FinishedBookList/FinishedBookList";
import NewFinishedBookForm from "../../components/Dashboard/NewFinishedBookForm/NewFinishedBookForm";

function Dashboard() {
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		if (alert) {
			setTimeout(() => {
				setAlert(false);
			}, 1000);
		}
	}, [alert]);

	const handleLogout = () => {
		localStorage.clear();
		window.location.pathname = "/";
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<button onClick={handleLogout}>Log Out</button>
			{alert && <h3>Action completed successfully</h3>}
			<ReadingBookList alert={alert} setAlert={setAlert} />
			<NewReadingBookForm setAlert={setAlert} />
			<FinishedBookList alert={alert} setAlert={setAlert} />
			<NewFinishedBookForm setAlert={setAlert} />
		</div>
	);
}

export default Dashboard;

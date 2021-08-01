import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	getReadingBooks,
	markReadingBookFinished,
	deleteReadingBook,
	createReadingBook,
} from "../../services/readingBooks";
import { getFinishedBooks } from "../../services/finishedBooks";

function Dashboard() {
	const [alert, setAlert] = useState(false);
	const [readingBooks, setReadingBooks] = useState([]);
	const [finishedBooks, setFinishedBooks] = useState([]);
	const [readingBookTitleInput, setReadingBookTitleInput] = useState("");

	useEffect(() => {
		let mounted = true;
		if (readingBooks.length && finishedBooks.length && !alert) {
			return;
		}
		getReadingBooks().then((retrievedReadingBooks) => {
			if (mounted) {
				setReadingBooks(retrievedReadingBooks);
			}
		});
		getFinishedBooks().then((retrievedFinishedBooks) => {
			if (mounted) {
				setFinishedBooks(retrievedFinishedBooks);
			}
		});
		return () => (mounted = false);
	}, [alert, readingBooks, finishedBooks]);

	useEffect(() => {
		if (alert) {
			setTimeout(() => {
				setAlert(false);
			}, 3000);
		}
	}, [alert]);

	const handleLogout = () => {
		localStorage.clear();
		window.location.pathname = "/";
	};

	const handleMarkReadingBookFinished = async (id) => {
		await markReadingBookFinished(id);
		setAlert(true);
	};

	const handleDeleteReadingBook = async (id) => {
		await deleteReadingBook(id);
		setAlert(true);
	};

	const handleNewReadingBookSubmit = async (e) => {
		e.preventDefault();
		await createReadingBook(readingBookTitleInput);
		setAlert(true);
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<button onClick={handleLogout}>Log Out</button>
			{alert && <h3>Action completed successfully</h3>}
			<h3>Reading Books</h3>
			<ul>
				{readingBooks.map((readingBook) => (
					<div key={readingBook.id}>
						<li>
							{readingBook.title}
							<button
								onClick={() => handleMarkReadingBookFinished(readingBook.id)}
							>
								Mark Finished
							</button>
							<button onClick={() => handleDeleteReadingBook(readingBook.id)}>
								Delete
							</button>
						</li>
					</div>
				))}
			</ul>
			<form onSubmit={handleNewReadingBookSubmit}>
				<label>
					<p>New Reading Book</p>
					<input
						type="text"
						onChange={(e) => setReadingBookTitleInput(e.target.value)}
						value={readingBookTitleInput}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			<h3>Finished Books</h3>
			<ul>
				{finishedBooks.map((finishedBook) => (
					<div key={finishedBook.id}>
						<li>
							{finishedBook.title}
							<Link to={`/dashboard/finishedbooks/edit/${finishedBook.id}`}>
								Edit
							</Link>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;

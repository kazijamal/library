import React, { useEffect, useState } from "react";
import { getReadingBooks } from "../../services/readingBooks";
import { getFinishedBooks } from "../../services/finishedBooks";

function Home() {
	const [readingBooks, setReadingBooks] = useState([]);
	const [finishedBooks, setFinishedBooks] = useState([]);

	useEffect(() => {
		getReadingBooks().then((retrievedReadingBooks) => {
			setReadingBooks(retrievedReadingBooks);
		});
		getFinishedBooks().then((retrievedFinishedBooks) => {
			setFinishedBooks(retrievedFinishedBooks);
		});
	}, []);

	return (
		<div>
			<h2>Home</h2>
			<a href="/login">Log In</a>
			<h3>Reading Books</h3>
			<ul>
				{readingBooks.map((readingBook) => (
					<li key={readingBook.id}>{readingBook.title}</li>
				))}
			</ul>
			<h3>Finished Books</h3>
			<ul>
				{finishedBooks.map((finishedBook) => (
					<li key={finishedBook.id}>{finishedBook.title}</li>
				))}
			</ul>
		</div>
	);
}

export default Home;

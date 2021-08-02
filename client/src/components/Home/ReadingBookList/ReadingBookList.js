import React, { useEffect, useState } from "react";
import { getReadingBooks } from "../../../services/readingBooks";

function ReadingBookList() {
	const [readingBooks, setReadingBooks] = useState([]);

	useEffect(() => {
		let mounted = true;
		getReadingBooks().then((retrievedReadingBooks) => {
			if (mounted) {
				setReadingBooks(retrievedReadingBooks);
			}
		});
		return () => (mounted = false);
	}, []);

	return (
		<div>
			<h3>Reading Books</h3>
			<ul>
				{readingBooks.map((readingBook) => (
					<li key={readingBook.id}>{readingBook.title}</li>
				))}
			</ul>
		</div>
	);
}

export default ReadingBookList;

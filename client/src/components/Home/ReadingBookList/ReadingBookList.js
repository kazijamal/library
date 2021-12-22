import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
		<div className="my-5">
			<h3 className="text-2xl font-semibold">Reading Books</h3>
			{readingBooks ? (
				<div className="flex flex-row">
					{readingBooks.map((readingBook) => (
						<div key={readingBook.id} className="">
							<img src={readingBook.imageLink} alt="book cover" />
							<Link to={`/readingbooks/${readingBook.id}`}>
								{readingBook.title}
							</Link>
						</div>
					))}
				</div>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default ReadingBookList;

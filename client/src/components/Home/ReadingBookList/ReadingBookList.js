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
			<h3 className="text-2xl font-semibold my-3">Reading Books</h3>
			{readingBooks ? (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
					{readingBooks.map((readingBook) => (
						<Link to={`/readingbooks/${readingBook.id}`} key={readingBook.id} className="rounded-lg mx-5 my-3 p-4 shadow-lg transition ease-in-out delay-150 hover:scale-105 hover:shadow-2xl">
							<img src={readingBook.imageLink} alt="book cover" className="m-auto mb-3 w-full" />
							<p className="text-md font-medium text-center">
								{readingBook.title}
							</p>
						</Link>
					))}
				</div>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default ReadingBookList;

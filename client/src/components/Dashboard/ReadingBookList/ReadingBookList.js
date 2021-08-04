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
		<div>
			<h3>Reading Books</h3>
			{readingBooks ? (
				<ul>
					{readingBooks.map((readingBook) => (
						<div key={readingBook.id}>
							<li>
								{readingBook.title}
								<Link to={`/dashboard/readingbooks/edit/${readingBook.id}`}>
									Edit
								</Link>
							</li>
						</div>
					))}
				</ul>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default ReadingBookList;

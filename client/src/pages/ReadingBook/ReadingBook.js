import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReadingBook } from "../../services/readingBooks";

function ReadingBook() {
	const { id } = useParams();
	const [readingBook, setReadingBook] = useState();

	useEffect(() => {
		let mounted = true;
		getReadingBook(id).then((retrievedReadingBook) => {
			if (mounted) {
				setReadingBook(retrievedReadingBook);
			}
		});
		return () => (mounted = false);
	}, [id]);

	if (!readingBook) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<img src={readingBook.imageLink} alt="book cover" />
			<h2>{readingBook.title}</h2>
			{readingBook.subtitle && <h3>{readingBook.subtitle}</h3>}
			<h4>{readingBook.authors.join(", ")}</h4>
			<p>
				Categories:{" "}
				{readingBook.categories.length ? (
					readingBook.categories.join(", ")
				) : (
					<span>None</span>
				)}
			</p>
			<p>{readingBook.pageCount} pages</p>
		</div>
	);
}

export default ReadingBook;

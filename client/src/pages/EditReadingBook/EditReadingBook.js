import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getReadingBook,
	markReadingBookFinished,
	deleteReadingBook,
} from "../../services/readingBooks";

function EditReadingBook() {
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

	const handleMarkReadingBookFinished = async (id) => {
		await markReadingBookFinished(id);
		window.location.pathname = "/dashboard";
	};

	const handleDeleteReadingBook = async (id) => {
		await deleteReadingBook(id);
		window.location.pathname = "/dashboard";
	};

	if (!readingBook) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<img src={readingBook.imageLink} alt="book cover" />
			<h2>Editing {readingBook.title}</h2>
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
			<button onClick={() => handleMarkReadingBookFinished(readingBook.id)}>
				Mark Reading Book as Finished
			</button>
			<button onClick={() => handleDeleteReadingBook(readingBook.id)}>
				Delete Reading Book
			</button>
		</div>
	);
}

export default EditReadingBook;

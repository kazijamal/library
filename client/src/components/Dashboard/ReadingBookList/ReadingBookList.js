import React, { useEffect, useState } from "react";
import {
	getReadingBooks,
	markReadingBookFinished,
	deleteReadingBook,
} from "../../../services/readingBooks";

function ReadingBookList(props) {
	const { alert, setAlert } = props;
	const [readingBooks, setReadingBooks] = useState([]);

	useEffect(() => {
		let mounted = true;
		if (readingBooks.length && !alert) {
			return;
		}
		getReadingBooks().then((retrievedReadingBooks) => {
			if (mounted) {
				setReadingBooks(retrievedReadingBooks);
			}
		});
		return () => (mounted = false);
	}, [alert, readingBooks]);

	const handleMarkReadingBookFinished = async (id) => {
		await markReadingBookFinished(id);
		setAlert(true);
	};

	const handleDeleteReadingBook = async (id) => {
		await deleteReadingBook(id);
		setAlert(true);
	};

	return (
		<div>
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
		</div>
	);
}

export default ReadingBookList;

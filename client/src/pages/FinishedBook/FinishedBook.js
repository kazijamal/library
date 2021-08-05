import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFinishedBook } from "../../services/finishedBooks";
import { getFinishedBookHighlights } from "../../services/highlights";
import moment from "moment";

function FinishedBook() {
	const { id } = useParams();
	const [finishedBook, setFinishedBook] = useState();
	const [highlights, setHighlights] = useState([]);

	useEffect(() => {
		let mounted = true;
		getFinishedBook(id).then((retrievedFinishedBook) => {
			if (mounted) {
				setFinishedBook(retrievedFinishedBook);
			}
		});
		getFinishedBookHighlights(id).then((retrievedHighlights) => {
			if (mounted) {
				setHighlights(retrievedHighlights);
			}
		});
		return () => (mounted = false);
	}, [id]);

	if (!finishedBook || !highlights) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<img src={finishedBook.imageLink} alt="book cover" />
			<h2>{finishedBook.title}</h2>
			{finishedBook.subtitle && <h3>{finishedBook.subtitle}</h3>}
			<h4>{finishedBook.authors.join(", ")}</h4>
			<p>
				Categories:{" "}
				{finishedBook.categories.length ? (
					finishedBook.categories.join(", ")
				) : (
					<span>None</span>
				)}
			</p>
			<p>{finishedBook.pageCount} pages</p>
			<p>
				Date Finished:{" "}
				{moment.utc(finishedBook.dateFinished).format("MMMM D, YYYY")}
			</p>
			<h3>Highlights</h3>
			{!highlights.length ? (
				<p>No highlights for this book</p>
			) : (
				<ul>
					{highlights.map((highlight) => (
						<li key={highlight.id}>
							{highlight.content} (Location: {highlight.location})
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default FinishedBook;

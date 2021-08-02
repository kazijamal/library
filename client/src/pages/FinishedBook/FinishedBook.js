import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFinishedBook } from "../../services/finishedBooks";
import { getFinishedBookHighlights } from "../../services/highlights";

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
	}, [finishedBook, highlights, id]);

	if (!finishedBook || !highlights) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<h2>{finishedBook.title}</h2>
			{!highlights.length ? (
				<p>No highlights for this book</p>
			) : (
				<ul>
					{highlights.map((highlight) => (
						<li key={highlight.id}>
							<span style={{ backgroundColor: highlight.color }}>
								{highlight.content}
							</span>{" "}
							(Location: {highlight.location})
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default FinishedBook;

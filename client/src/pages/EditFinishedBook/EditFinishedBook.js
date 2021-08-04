import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getFinishedBook,
	deleteFinishedBook,
} from "../../services/finishedBooks";
import { getFinishedBookHighlights } from "../../services/highlights";
import HighlightsForm from "../../components/EditFinishedBook/HighlightsForm/HighlightsForm";

function EditFinishedBook() {
	const [alert, setAlert] = useState(false);
	const { id } = useParams();
	const [finishedBook, setFinishedBook] = useState();
	const [highlights, setHighlights] = useState([]);
	const [fetchedHighlights, setFetchedHighlights] = useState(false);

	useEffect(() => {
		let mounted = true;
		if (finishedBook && fetchedHighlights && !alert) {
			return;
		}
		if (!finishedBook) {
			getFinishedBook(id).then((retrievedFinishedBook) => {
				if (mounted) {
					setFinishedBook(retrievedFinishedBook);
				}
			});
		}
		if (!fetchedHighlights) {
			const timeout = alert ? 1000 : 0;
			setTimeout(() => {
				getFinishedBookHighlights(id).then((retrievedHighlights) => {
					if (mounted) {
						setHighlights(retrievedHighlights);
						setFetchedHighlights(true);
					}
				});
			}, timeout);
		}
		return () => (mounted = false);
	}, [alert, finishedBook, fetchedHighlights, id]);

	useEffect(() => {
		if (alert) {
			setTimeout(() => {
				setAlert(false);
			}, 1000);
		}
	}, [alert]);

	const handleDeleteFinishedBook = async (id) => {
		await deleteFinishedBook(id);
		window.location.pathname = "/dashboard";
	};

	if (!finishedBook || !highlights) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<h2>Editing {finishedBook.title}</h2>
			{alert && <h3>Action completed successfully</h3>}
			{!highlights.length ? (
				<HighlightsForm
					finishedBookId={finishedBook.id}
					setAlert={setAlert}
					setFetchedHighlights={setFetchedHighlights}
				/>
			) : (
				<ul>
					{highlights.map((highlight) => (
						<li key={highlight.id}>
							{highlight.content} (Location: {highlight.location})
						</li>
					))}
				</ul>
			)}
			<button onClick={() => handleDeleteFinishedBook(finishedBook.id)}>
				Delete Finished Book
			</button>
		</div>
	);
}

export default EditFinishedBook;

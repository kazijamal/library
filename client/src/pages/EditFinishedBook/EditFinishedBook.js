import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
			getFinishedBookHighlights(id).then((retrievedHighlights) => {
				if (mounted) {
					setHighlights(retrievedHighlights);
					setFetchedHighlights(true);
				}
			});
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
			<img src={finishedBook.imageLink} alt="book cover" />
			<h2>Editing {finishedBook.title}</h2>
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
			{alert && <h3>Action completed successfully</h3>}
			{!highlights.length ? (
				<HighlightsForm
					finishedBookId={finishedBook.id}
					setAlert={setAlert}
					setFetchedHighlights={setFetchedHighlights}
				/>
			) : (
				<Link to={`/finishedbooks/${finishedBook.id}`}>View Highlights</Link>
			)}
			<button onClick={() => handleDeleteFinishedBook(finishedBook.id)}>
				Delete Finished Book
			</button>
		</div>
	);
}

export default EditFinishedBook;

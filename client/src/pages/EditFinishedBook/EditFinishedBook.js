import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getFinishedBook,
	deleteFinishedBook,
} from "../../services/finishedBooks";
import { getFinishedBookHighlights } from "../../services/highlights";
import HighlightsForm from "../../components/Dashboard/HighlightsForm/HighlightsForm";

function EditFinishedBook() {
	const { id } = useParams();
	const [finishedBook, setFinishedBook] = useState();

	useEffect(() => {
		let mounted = true;
		getFinishedBook(id).then((retrievedFinishedBook) => {
			if (mounted) {
				setFinishedBook(retrievedFinishedBook);
			}
		});
		return () => (mounted = false);
	}, [id]);

	const handleDeleteFinishedBook = async (id) => {
		await deleteFinishedBook(id);
		window.location.pathname = "/dashboard";
	};

	if (!finishedBook) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<h2>Editing {finishedBook.title}</h2>
			<HighlightsForm finishedBookId={finishedBook.id} />
			<button onClick={() => handleDeleteFinishedBook(finishedBook.id)}>
				Delete Finished Book
			</button>
		</div>
	);
}

export default EditFinishedBook;

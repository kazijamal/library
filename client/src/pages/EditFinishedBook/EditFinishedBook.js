import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFinishedBook } from "../../services/finishedBooks";

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

	if (!finishedBook) {
		return <p>Loading</p>;
	}

	return (
		<div>
			<h2>Editing {finishedBook.title}</h2>
		</div>
	);
}

export default EditFinishedBook;

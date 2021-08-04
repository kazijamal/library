import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFinishedBooks } from "../../../services/finishedBooks";

function FinishedBookList() {
	const [finishedBooks, setFinishedBooks] = useState([]);

	useEffect(() => {
		let mounted = true;
		getFinishedBooks().then((retrievedFinishedBooks) => {
			if (mounted) {
				setFinishedBooks(retrievedFinishedBooks);
			}
		});
		return () => (mounted = false);
	}, []);

	return (
		<div>
			<h3>Finished Books</h3>
			{finishedBooks ? (
				<ul>
					{finishedBooks.map((finishedBook) => (
						<li key={finishedBook.id}>
							<Link to={`/finishedbooks/${finishedBook.id}`}>
								{finishedBook.title}
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default FinishedBookList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFinishedBooks } from "../../../services/finishedBooks";
import { Typography } from "@material-ui/core";

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
			<Typography variant="h4">Finished Books</Typography>
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

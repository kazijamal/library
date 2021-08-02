import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFinishedBooks } from "../../../services/finishedBooks";

function FinishedBookList(props) {
	const { alert } = props;
	const [finishedBooks, setFinishedBooks] = useState([]);

	useEffect(() => {
		let mounted = true;
		if (finishedBooks.length && !alert) {
			return;
		}
		getFinishedBooks().then((retrievedFinishedBooks) => {
			if (mounted) {
				setFinishedBooks(retrievedFinishedBooks);
			}
		});
		return () => (mounted = false);
	}, [alert, finishedBooks]);

	return (
		<div>
			<h3>Finished Books</h3>
			<ul>
				{finishedBooks.map((finishedBook) => (
					<div key={finishedBook.id}>
						<li>
							{finishedBook.title}
							<Link to={`/dashboard/finishedbooks/edit/${finishedBook.id}`}>
								Edit
							</Link>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}

export default FinishedBookList;

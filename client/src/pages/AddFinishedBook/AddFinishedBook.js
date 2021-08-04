import React, { useState } from "react";
import { createFinishedBook } from "../../services/finishedBooks";

function AddFinishedBook() {
	const [title, setTitle] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createFinishedBook(title);
		window.location.pathname = "/dashboard";
	};

	return (
		<div>
			<h2>Add Finished Book</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<p>New Finished Book Title</p>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddFinishedBook;

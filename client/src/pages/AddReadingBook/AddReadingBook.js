import React, { useState } from "react";
import { createReadingBook } from "../../services/readingBooks";

function AddReadingBook() {
	const [title, setTitle] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createReadingBook(title);
		window.location.pathname = "/dashboard";
	};

	return (
		<div>
			<h2>Add Reading Book</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<p>New Reading Book Title</p>
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

export default AddReadingBook;

import React, { useState } from "react";
import { createReadingBook } from "../../../services/readingBooks";

function NewReadingBookForm(props) {
	const { setAlert } = props;
	const [readingBookTitleInput, setReadingBookTitleInput] = useState("");

	const handleNewReadingBookSubmit = async (e) => {
		e.preventDefault();
		await createReadingBook(readingBookTitleInput);
		setAlert(true);
	};

	return (
		<div>
			<form onSubmit={handleNewReadingBookSubmit}>
				<label>
					<p>New Reading Book</p>
					<input
						type="text"
						onChange={(e) => setReadingBookTitleInput(e.target.value)}
						value={readingBookTitleInput}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default NewReadingBookForm;

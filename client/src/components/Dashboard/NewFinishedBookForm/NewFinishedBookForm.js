import React, { useState } from "react";
import { createFinishedBook } from "../../../services/finishedBooks";

function NewFinishedBookForm(props) {
	const { setAlert } = props;
	const [finishedBookTitleInput, setFinishedBookTitleInput] = useState("");

	const handleNewFinishedBookSubmit = async (e) => {
		e.preventDefault();
		await createFinishedBook(finishedBookTitleInput);
		setAlert(true);
	};

	return (
		<div>
			<form onSubmit={handleNewFinishedBookSubmit}>
				<label>
					<p>New Finished Book</p>
					<input
						type="text"
						onChange={(e) => setFinishedBookTitleInput(e.target.value)}
						value={finishedBookTitleInput}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default NewFinishedBookForm;

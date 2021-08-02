import React, { useRef } from "react";
import { uploadHighlights } from "../../../services/highlights";

const HighlightsForm = (props) => {
	const formRef = useRef(null);
	const submit_file = async (e) => {
		e.preventDefault();
		const form_data = new FormData(formRef.current);
		await uploadHighlights(form_data);
	};

	return (
		<form onSubmit={submit_file} ref={formRef}>
			<input
				type="number"
				name="finishedBookId"
				value={props.finishedBookId}
				hidden
				readOnly
			/>
			<input type="file" name="highlights-file" required />
			<input type="submit" value="Submit" />
		</form>
	);
};

export default HighlightsForm;

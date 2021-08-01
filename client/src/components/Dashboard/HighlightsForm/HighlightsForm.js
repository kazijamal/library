import React, { useRef } from "react";
import { uploadHighlights } from "../../../services/highlights";

const HighlightsForm = () => {
	const formRef = useRef(null);
	const submit_file = async (e) => {
		e.preventDefault();
		const form_data = new FormData(formRef.current);
		await uploadHighlights(form_data);
	};

	return (
		<form onSubmit={submit_file} ref={formRef}>
			<input type="file" name="highlights-file" />
			<input type="submit" value="Submit" />
		</form>
	);
};

export default HighlightsForm;

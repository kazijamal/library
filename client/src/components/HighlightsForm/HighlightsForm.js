import React, { useRef } from "react";
import axios from "axios";

const HighlightsForm = () => {
	const formRef = useRef(null);
	const submit_file = (e) => {
		e.preventDefault();

		const form_data = new FormData(formRef.current);

		axios({
			url: "/api/highlights/upload",
			method: "post",
			headers: { "Content-Type": "multipart/form-data" },
			data: form_data,
		})
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<form onSubmit={submit_file} ref={formRef}>
			<input type="file" name="highlights-file" />
			<input type="submit" value="Submit" />
		</form>
	);
};

export default HighlightsForm;

import React, { useRef } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const formRef = useRef(null);
	const submit_file = (e) => {
		e.preventDefault();

		const form_data = new FormData(formRef.current);

		axios({
			url: "http://localhost:3030/highlights/upload",
			method: "post",
			headers: { "Content-Type": "multipart/form-data" },
			data: form_data,
		})
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<form onSubmit={submit_file} ref={formRef}>
					<input type="file" name="highlights-file" />
					<input type="submit" value="Submit" />
				</form>
			</header>
		</div>
	);
};

export default App;

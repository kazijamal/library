import React, { useRef } from "react";
import axios from "axios";
import logo from "./logo.svg";
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
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<form onSubmit={submit_file} ref={formRef}>
					<input type="file" name="highlights-file" />
					<input type="submit" value="Submit" />
				</form>
			</header>
		</div>
	);
};

export default App;

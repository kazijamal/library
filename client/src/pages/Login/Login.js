import React, { useState } from "react";
import { loginUser } from "../../services/users";
import useToken from "../../utils/useToken";

function Login() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const { token, setToken } = useToken();

	const handleSubmit = (e) => {
		e.preventDefault();
		const credentials = {
			username,
			password,
		};
		loginUser(credentials).then((token) => {
			setToken(token);
		});
	};

	if (token) {
		window.location.pathname = "/dashboard";
	}

	return (
		<div>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					<p>Password</p>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Login;

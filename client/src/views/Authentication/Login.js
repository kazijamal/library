import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../../services/users";
import useToken from "../../utils/useToken";

function Login() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const { token, setToken } = useToken();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const credentials = {
			username,
			password,
		};
		const token = await loginUser(credentials);
		setToken(token);
	};

	if (token) {
		window.location.pathname = "/dashboard";
	}

	return (
		<div className="login-wrapper">
			<h1>Please Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input type="text" onChange={(e) => setUsername(e.target.value)} />
				</label>
				<label>
					<p>Password</p>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
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

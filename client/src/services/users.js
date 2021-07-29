import axios from "axios";

export async function loginUser(credentials) {
	return axios({
		url: "/api/users/login",
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	})
		.then((res) => res.data)
		.catch((err) => console.error(err));
}

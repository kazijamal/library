import axios from "axios";

export function getFinishedBooks() {
	return axios
		.get("/api/finishedbooks")
		.then(function (res) {
			return res.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}

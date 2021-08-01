import axios from "axios";

export function getReadingBooks() {
	return axios
		.get("/api/readingbooks")
		.then(function (res) {
			return res.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}

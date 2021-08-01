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

export async function markReadingBookFinished(id) {
	axios
		.patch(`/api/readingbooks/markfinished/${id}`)
		.then(function (res) {
			console.log(res);
		})
		.catch(function (err) {
			console.log(err);
		});
}

export async function deleteReadingBook(id) {
	axios
		.delete(`/api/readingbooks/${id}`)
		.then(function (res) {
			console.log(res);
		})
		.catch(function (err) {
			console.log(err);
		});
}

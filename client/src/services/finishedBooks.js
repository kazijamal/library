import axios from "axios";

export async function getFinishedBooks() {
	return axios
		.get("/api/finishedbooks")
		.then(function (res) {
			return res.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export async function getFinishedBook(id) {
	return axios
		.get(`/api/finishedbooks/${id}`)
		.then(function (res) {
			return res.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export async function deleteFinishedBook(id) {
	axios
		.delete(`/api/finishedbooks/${id}`)
		.then(function (res) {
			console.log(res);
		})
		.catch(function (err) {
			console.log(err);
		});
}

export async function createFinishedBook(title) {
	axios
		.post("/api/finishedbooks", { title })
		.then(function (res) {
			console.log(res);
		})
		.catch(function (err) {
			console.log(err);
		});
}

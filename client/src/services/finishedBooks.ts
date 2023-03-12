import axios from "axios";

export async function getFinishedBooks() {
  return axios.get("/api/finishedbooks").then((res) => res.data);
}

export async function getFinishedBook(id) {
  return axios.get(`/api/finishedbooks/${id}`).then((res) => res.data);
}

export async function deleteFinishedBook({ id }) {
  return axios.delete(`/api/finishedbooks/${id}`).then((res) => res);
}

export async function createFinishedBook({ title, dateFinished }) {
  return axios
    .post("/api/finishedbooks", { title, dateFinished })
    .then((res) => res);
}

import axios from "axios";

export async function getFinishedBooks() {
  return axios.get("/api/finishedbooks").then((res) => res.data);
}

export async function getFinishedBook(id: number) {
  return axios.get(`/api/finishedbooks/${id}`).then((res) => res.data);
}

export async function deleteFinishedBook(finishedBook: { id: number }) {
  return axios
    .delete(`/api/finishedbooks/${finishedBook.id}`)
    .then((res) => res);
}

export async function createFinishedBook(finishedBook: {
  title: string;
  dateFinished: string;
}) {
  return axios.post("/api/finishedbooks", finishedBook).then((res) => res);
}

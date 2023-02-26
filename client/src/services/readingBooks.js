import axios from "axios";

export async function getReadingBooks() {
  return axios.get("/api/readingbooks").then((res) => res.data);
}

export async function getReadingBook(id) {
  return axios.get(`/api/readingbooks/${id}`).then((res) => res.data);
}

export async function markReadingBookFinished({ id, dateFinished }) {
  return axios
    .post("/api/readingbooks/markfinished", { id, dateFinished })
    .then((res) => res);
}

export async function deleteReadingBook({ id }) {
  return axios.delete(`/api/readingbooks/${id}`).then((res) => res);
}

export async function createReadingBook({ title }) {
  return axios.post("/api/readingbooks", { title }).then((res) => res);
}

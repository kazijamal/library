import axios from "axios";

export async function getReadingBooks() {
  return axios.get("/api/readingbooks").then((res) => res.data);
}

export async function getReadingBook(id: number) {
  return axios.get(`/api/readingbooks/${id}`).then((res) => res.data);
}

export async function markReadingBookFinished(readingBook: {
  id: number;
  dateFinished: string;
}) {
  return axios
    .post("/api/readingbooks/markfinished", readingBook)
    .then((res) => res);
}

export async function deleteReadingBook(readingBook: { id: number }) {
  return axios.delete(`/api/readingbooks/${readingBook.id}`).then((res) => res);
}

export async function createReadingBook(readingBook: { title: string }) {
  return axios.post("/api/readingbooks", readingBook).then((res) => res);
}

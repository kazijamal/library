import axios from "axios";

export async function getFinishedBooks() {
  return axios.get("/api/finishedbooks").then((res) => res.data);
}

export async function getFinishedBook(id) {
  return axios.get(`/api/finishedbooks/${id}`).then((res) => res.data);
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

export async function createFinishedBook(title, dateFinished) {
  axios
    .post("/api/finishedbooks", { title, dateFinished })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

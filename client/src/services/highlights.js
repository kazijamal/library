import axios from "axios";

export async function uploadHighlights({ formData }) {
  return axios
    .post("/api/highlights/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res);
}

export async function getFinishedBookHighlights(finishedBookId) {
  return axios
    .get(`/api/highlights/finishedbook/${finishedBookId}`)
    .then((res) => res.data);
}

export async function getRandomHighlights(count) {
  return axios.get(`/api/highlights/random/${count}`).then((res) => res.data);
}

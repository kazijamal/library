import axios from "axios";

export async function uploadHighlights({ formData }: { formData: FormData }) {
  return axios
    .post("/api/highlights/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res);
}

export async function getFinishedBookHighlights(finishedBookId: number) {
  return axios
    .get(`/api/highlights/finishedbook/${finishedBookId}`)
    .then((res) => res.data);
}

export async function getRandomHighlights(count: number) {
  return axios.get(`/api/highlights/random/${count}`).then((res) => res.data);
}

export async function searchHighlights(query: string) {
  return axios.get(`/api/highlights/search?q=${query}`).then((res) => res.data);
}

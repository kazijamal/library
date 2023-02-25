import axios from "axios";

export async function uploadHighlights(form_data) {
  axios
    .post("/api/highlights/upload", form_data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

export async function getFinishedBookHighlights(finishedBookId) {
  return axios
    .get(`/api/highlights/finishedbook/${finishedBookId}`)
    .then((res) => res.data);
}

export async function getRandomHighlights(count) {
  return axios.get(`/api/highlights/random/${count}`).then((res) => res.data);
}

import axios from 'axios';

export async function getReadingBooks() {
  return axios
    .get('/api/readingbooks')
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

export async function getReadingBook(id) {
  return axios
    .get(`/api/readingbooks/${id}`)
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

export async function markReadingBookFinished(id, dateFinished) {
  axios
    .post('/api/readingbooks/markfinished', { id, dateFinished })
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

export async function createReadingBook(title) {
  axios
    .post('/api/readingbooks', { title })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

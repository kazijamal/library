import axios from 'axios';

export function loginUser(credentials) {
  return axios
    .post('/api/users/login', credentials)
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

import axios from "axios";

export async function loginUser(credentials: {
  username: string;
  password: string;
}) {
  return axios
    .post("/api/users/login", credentials)
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

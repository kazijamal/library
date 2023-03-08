import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/users";
import useToken from "../utils/useToken";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setToken } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    loginUser(credentials).then((token) => {
      setToken(token);
      if (token) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="m-auto w-full rounded-2xl bg-gray-800 p-10 shadow-xl md:w-1/2">
      <h1 className="mb-5 text-center text-3xl font-semibold">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="text-lg font-medium">Username</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="my-3 w-full rounded-md border border-none bg-gray-900 px-3 py-2"
          />
        </label>
        <label>
          <p className="text-lg font-medium">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="my-3 w-full rounded-md border border-none bg-gray-900 px-3 py-2"
          />
        </label>
        <div className="grid place-items-center">
          <button
            type="submit"
            className="mx-auto mt-5 rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

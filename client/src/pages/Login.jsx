import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/users';
import useToken from '../utils/useToken';

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
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className='rounded-2xl shadow-xl m-auto p-10 w-full md:w-1/2 bg-white dark:bg-neutral-800'>
      <h1 className='text-3xl font-semibold text-center mb-5'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className='text-lg font-medium'>Username</p>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            required
            className='my-3 px-3 py-2 border border-gray-300 rounded-md w-full dark:bg-neutral-900 dark:border-none'
          />
        </label>
        <label>
          <p className='text-lg font-medium'>Password</p>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='my-3 px-3 py-2 border border-gray-300 rounded-md w-full dark:bg-neutral-900 dark:border-none'
          />
        </label>
        <div className='grid place-items-center'>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5 mx-auto rounded dark:bg-green-500/50 dark:hover:bg-green-700/50'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

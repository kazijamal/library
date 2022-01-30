import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFinishedBook } from '../services/finishedBooks';

function AddFinishedBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [dateFinished, setDateFinished] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFinishedBook(title, dateFinished);
    navigate('/dashboard');
  };

  return (
    <div>
      <div className='rounded-2xl shadow-xl m-auto p-10 w-full md:w-1/2'>
        <h1 className='text-3xl font-semibold text-center mb-5'>
          Add Finished Book
        </h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p className='text-lg font-medium'>Title</p>
            <input
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className='my-3 px-3 py-2 border border-gray-300 rounded-md w-full'
            />
          </label>
          <label>
            <p className='text-lg font-medium'>Date Finished</p>
            <input
              type='date'
              onChange={(e) => setDateFinished(e.target.value)}
              value={dateFinished}
              required
              className='my-3 px-3 py-2 border border-gray-300 rounded-md w-full'
            />
          </label>
          <div className='grid place-items-center'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5 mx-auto rounded'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFinishedBook;

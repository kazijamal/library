import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReadingBook } from '../services/readingBooks';

function AddReadingBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReadingBook(title);
    navigate('/dashboard');
  };

  return (
    <div className='rounded-2xl shadow-xl m-auto p-10 w-full md:w-1/2 bg-white dark:bg-neutral-800'>
      <h1 className='text-3xl font-semibold text-center mb-5'>
        Add Reading Book
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className='text-lg font-medium'>Title</p>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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

export default AddReadingBook;

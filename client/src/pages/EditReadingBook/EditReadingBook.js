import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getReadingBook,
  markReadingBookFinished,
  deleteReadingBook,
} from '../../services/readingBooks';

function EditReadingBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [readingBook, setReadingBook] = useState();
  const [dateFinished, setDateFinished] = useState('');

  useEffect(() => {
    let mounted = true;
    getReadingBook(id).then((retrievedReadingBook) => {
      if (mounted) {
        setReadingBook(retrievedReadingBook);
      }
    });
    return () => (mounted = false);
  }, [id]);

  const handleMarkReadingBookFinished = async (e) => {
    e.preventDefault();
    await markReadingBookFinished(id, dateFinished);
    navigate('/dashboard');
  };

  const handleDeleteReadingBook = async (id) => {
    await deleteReadingBook(id);
    navigate('/dashboard');
  };

  if (!readingBook) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Link
        to='/dashboard'
        className='text-xl underline text-gray-600 hover:text-black'
      >
        ← Back to dashboard
      </Link>
      <div className='text-center mt-5'>
        <img
          src={readingBook.imageLink}
          alt='book cover'
          className='m-auto shadow-lg'
        />
        <h2 className='text-3xl font-semibold mt-5'>{readingBook.title}</h2>
        {readingBook.subtitle && (
          <h3 className='text-xl font-medium italic'>{readingBook.subtitle}</h3>
        )}
        <h4 className='text-xl font-medium mt-3'>
          {readingBook.authors.join(', ')}
        </h4>
        <p>
          Categories:{' '}
          {readingBook.categories.length ? (
            readingBook.categories.join(', ')
          ) : (
            <span>None</span>
          )}
        </p>
        {readingBook.pageCount && <p>{readingBook.pageCount} pages</p>}
        <form onSubmit={handleMarkReadingBookFinished} className='my-5'>
          <label>
            <p className='text-xl font-medium mt-3'>Date Finished</p>
            <input
              type='date'
              onChange={(e) => setDateFinished(e.target.value)}
              value={dateFinished}
              required
              className='my-3 px-3 py-2 border border-gray-300 rounded-md'
            />
          </label>
          <br />
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            Mark Reading Book as Finished
          </button>
        </form>
        <button
          onClick={() => handleDeleteReadingBook(readingBook.id)}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Delete Reading Book
        </button>
      </div>
    </div>
  );
}

export default EditReadingBook;

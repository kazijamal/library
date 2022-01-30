import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFinishedBooks } from '../../services/finishedBooks';

function FinishedBookList() {
  const [finishedBooks, setFinishedBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFinishedBooks().then((retrievedFinishedBooks) => {
      if (mounted) {
        setFinishedBooks(retrievedFinishedBooks);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className='my-5'>
      <h3 className='text-2xl font-semibold my-3'>
        Books I've Finished Reading
      </h3>
      {finishedBooks ? (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
          {finishedBooks.map((finishedBook) => (
            <Link
              to={`/finishedbooks/${finishedBook.id}`}
              key={finishedBook.id}
              className='rounded-lg mx-5 my-3 p-4 shadow-lg transition ease-in-out delay-150 hover:scale-105 hover:shadow-2xl'
            >
              <img
                src={finishedBook.imageLink}
                alt='book cover'
                className='m-auto mb-3 w-full'
              />
              <p className='text-md font-medium text-center'>
                {finishedBook.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default FinishedBookList;

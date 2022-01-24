import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomHighlights } from '../../../services/highlights';

function RandomHighlights() {
  const [randomHighlights, setRandomHighlights] = useState([]);

  useEffect(() => {
    let mounted = true;
    getRandomHighlights(2).then((retrievedRandomHighlights) => {
      if (mounted) {
        setRandomHighlights(retrievedRandomHighlights);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className='my-5'>
      <h3 className='text-2xl font-semibold my-3'>Highlights of the Day</h3>
      {randomHighlights ? (
        <ul className='text-left w-full'>
          {randomHighlights.map((highlight) => (
            <div key={highlight.id}>
              <li className='mt-5 mb-3 mx-2 bg-green-50 p-2 transition ease-in-out delay-150 hover:scale-105 hover:shadow-lg'>
                {highlight.content}
              </li>
              <p className='mb-5 mx-3 text-md'>
                Highlight from{' '}
                <Link
                  to={`/finishedbooks/${highlight.finishedBook.id}`}
                  className='font-medium hover:underline'
                >
                  {highlight.finishedBook.title}
                </Link>
              </p>
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default RandomHighlights;

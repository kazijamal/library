import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFinishedBook } from '../services/finishedBooks';
import { getFinishedBookHighlights } from '../services/highlights';
import moment from 'moment';

function FinishedBook() {
  const { id } = useParams();
  const [finishedBook, setFinishedBook] = useState();
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFinishedBook(id).then((retrievedFinishedBook) => {
      if (mounted) {
        setFinishedBook(retrievedFinishedBook);
      }
    });
    getFinishedBookHighlights(id).then((retrievedHighlights) => {
      if (mounted) {
        setHighlights(retrievedHighlights);
      }
    });
    return () => (mounted = false);
  }, [id]);

  if (!finishedBook || !highlights) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Link
        to='/'
        className='text-xl underline text-gray-600 hover:text-black dark:text-neutral-100 dark:hover:text-indigo-200'
      >
        ← Back to all books
      </Link>
      <div className='text-center mt-5'>
        <img
          src={finishedBook.imageLink}
          alt='book cover'
          className='m-auto shadow-lg rounded-lg'
        />
        <h2 className='text-3xl font-semibold mt-5'>{finishedBook.title}</h2>
        {finishedBook.subtitle && (
          <h3 className='text-xl font-medium italic'>
            {finishedBook.subtitle}
          </h3>
        )}
        <h4 className='text-xl font-medium mt-3'>
          {finishedBook.authors.join(', ')}
        </h4>
        <p>
          Categories:{' '}
          {finishedBook.categories.length ? (
            finishedBook.categories.join(', ')
          ) : (
            <span>None</span>
          )}
        </p>
        {finishedBook.pageCount && <p>{finishedBook.pageCount} pages</p>}
        <p className='mb-5'>
          Date Finished:{' '}
          {moment.utc(finishedBook.dateFinished).format('MMMM D, YYYY')}
        </p>
        <h3 className='text-2xl font-semibold mb-5'>Highlights</h3>
        {!highlights.length ? (
          <p>No highlights for this book</p>
        ) : (
          <ul className='text-left w-full md:w-3/4 m-auto'>
            {highlights.map((highlight) => (
              <li
                key={highlight.id}
                className='mt-5 mb-3 mx-2 rounded bg-indigo-100 p-2 dark:bg-indigo-500/25'
              >
                {highlight.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FinishedBook;

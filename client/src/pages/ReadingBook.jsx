import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReadingBook } from '../services/readingBooks';

function ReadingBook() {
  const { id } = useParams();
  const [readingBook, setReadingBook] = useState();

  useEffect(() => {
    let mounted = true;
    getReadingBook(id).then((retrievedReadingBook) => {
      if (mounted) {
        setReadingBook(retrievedReadingBook);
      }
    });
    return () => (mounted = false);
  }, [id]);

  if (!readingBook) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Link to='/' className='text-xl underline text-gray-600 hover:text-black'>
        ← Back to all books
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
      </div>
    </div>
  );
}

export default ReadingBook;

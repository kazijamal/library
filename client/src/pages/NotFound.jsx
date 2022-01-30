import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <Link
        to='/'
        className='text-xl underline text-gray-600 hover:text-black dark:text-neutral-100 dark:hover:text-indigo-200'
      >
        ← Back Home
      </Link>
      <div className='text-center mt-5'>
        <h2 className='text-3xl font-semibold mt-5'>Page Not Found</h2>
      </div>
    </div>
  );
}

export default NotFound;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RandomHighlights from '../../components/Home/RandomHighlights/RandomHighlights';
import ReadingBookList from '../../components/Dashboard/ReadingBookList/ReadingBookList';
import FinishedBookList from '../../components/Dashboard/FinishedBookList/FinishedBookList';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Log Out
      </button>
      <RandomHighlights />
      <ReadingBookList />
      <Link
        to='/dashboard/readingbooks/add'
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Reading Book
      </Link>
      <FinishedBookList />
      <Link
        to='/dashboard/finishedbooks/add'
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Finished Book
      </Link>
    </div>
  );
}

export default Dashboard;

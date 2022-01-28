import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ReadingBook from './pages/ReadingBook/ReadingBook';
import FinishedBook from './pages/FinishedBook/FinishedBook';
import AlreadyAuth from './components/AlreadyAuth/AlreadyAuth';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import EditReadingBook from './pages/EditReadingBook/EditReadingBook';
import AddReadingBook from './pages/AddReadingBook/AddReadingBook';
import EditFinishedBook from './pages/EditFinishedBook/EditFinishedBook';
import AddFinishedBook from './pages/AddFinishedBook/AddFinishedBook';
import NotFound from './pages/NotFound/NotFound';
import { useDarkMode } from './utils/useDarkMode';

function App() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className='relative wrapper'>
      <h1 className='select-none mb-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600'>
        Kazi's Library
      </h1>
      <div className='absolute top-6 right-6 w-min cursor-pointer transition ease-in-out delay-50 hover:scale-110'>
        {isDark ? (
          <svg
            onClick={(e) => setIsDark(false)}
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 text-indigo-200'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
            />
          </svg>
        ) : (
          <svg
            onClick={(e) => setIsDark(true)}
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 text-gray-900'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
          </svg>
        )}
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<AlreadyAuth />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/readingbooks/:id' element={<ReadingBook />} />
          <Route path='/finishedbooks/:id' element={<FinishedBook />} />
          <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/dashboard/readingbooks/edit/:id'
              element={<EditReadingBook />}
            />
            <Route
              path='/dashboard/readingbooks/add'
              element={<AddReadingBook />}
            />
            <Route
              path='/dashboard/finishedbooks/edit/:id'
              element={<EditFinishedBook />}
            />
            <Route
              path='/dashboard/finishedbooks/add'
              element={<AddFinishedBook />}
            />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

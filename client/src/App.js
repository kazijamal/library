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

function App() {
  return (
    <div className='wrapper'>
      <h1 className='select-none mb-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600'>
        Kazi's Library
      </h1>
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

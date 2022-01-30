import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ReadingBook from './pages/ReadingBook';
import FinishedBook from './pages/FinishedBook';
import AlreadyAuth from './components/AlreadyAuth';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import EditReadingBook from './pages/EditReadingBook';
import AddReadingBook from './pages/AddReadingBook';
import EditFinishedBook from './pages/EditFinishedBook';
import AddFinishedBook from './pages/AddFinishedBook';
import NotFound from './pages/NotFound';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <div className='background bg-neutral-50 dark:bg-neutral-900'>
      <div className='wrapper relative dark:text-neutral-100'>
        <h1 className='select-none mb-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600'>
          Kazi's Library
        </h1>
        <DarkModeToggle />
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
    </div>
  );
}

export default App;

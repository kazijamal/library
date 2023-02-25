import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReadingBook from "./pages/ReadingBook";
import FinishedBook from "./pages/FinishedBook";
import AlreadyAuth from "./components/AlreadyAuth";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import EditReadingBook from "./pages/EditReadingBook";
import AddReadingBook from "./pages/AddReadingBook";
import EditFinishedBook from "./pages/EditFinishedBook";
import AddFinishedBook from "./pages/AddFinishedBook";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="background bg-neutral-50 dark:bg-neutral-900">
      <div className="wrapper dark:text-neutral-100">
        <Navbar />
        <Router>
          <Routes>
            <Route element={<AlreadyAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/readingbooks/:id" element={<ReadingBook />} />
            <Route path="/finishedbooks/:id" element={<FinishedBook />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/readingbooks/edit/:id"
                element={<EditReadingBook />}
              />
              <Route
                path="/dashboard/readingbooks/add"
                element={<AddReadingBook />}
              />
              <Route
                path="/dashboard/finishedbooks/edit/:id"
                element={<EditFinishedBook />}
              />
              <Route
                path="/dashboard/finishedbooks/add"
                element={<AddFinishedBook />}
              />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import RandomHighlights from "../components/Home/RandomHighlights";
import ReadingBookList from "../components/Dashboard/ReadingBookList";
import FinishedBookList from "../components/Dashboard/FinishedBookList";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 dark:bg-red-500/50 dark:hover:bg-red-700/50"
      >
        Log Out
      </button>
      <RandomHighlights />
      <ReadingBookList />
      <Link
        to="/dashboard/readingbooks/add"
        className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 dark:bg-green-500/50 dark:hover:bg-green-700/50"
      >
        Add Reading Book
      </Link>
      <FinishedBookList />
      <Link
        to="/dashboard/finishedbooks/add"
        className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 dark:bg-green-500/50 dark:hover:bg-green-700/50"
      >
        Add Finished Book
      </Link>
    </div>
  );
}

export default Dashboard;

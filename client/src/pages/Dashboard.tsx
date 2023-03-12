import { Link, useNavigate } from "react-router-dom";
import RandomHighlights from "../components/RandomHighlights";
import ReadingBookList from "../components/ReadingBookList";
import FinishedBookList from "../components/FinishedBookList";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/dashboard/readingbooks/add"
          className="rounded bg-green-500/50 py-2 px-4 text-center font-bold text-white hover:bg-green-700/50"
        >
          Add Reading Book
        </Link>
        <Link
          to="/dashboard/finishedbooks/add"
          className="rounded bg-green-500/50 py-2 px-4 text-center font-bold text-white hover:bg-green-700/50"
        >
          Add Finished Book
        </Link>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500/50 py-2 px-4 text-center font-bold text-white hover:bg-red-700/50"
        >
          Log Out
        </button>
      </div>

      <RandomHighlights />
      <ReadingBookList dashboard={true} />
      <FinishedBookList dashboard={true} />
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFinishedBook, deleteFinishedBook } from "../services/finishedBooks";
import { getFinishedBookHighlights } from "../services/highlights";
import HighlightsForm from "../components/EditFinishedBook/HighlightsForm";
import moment from "moment";

function EditFinishedBook() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const { id } = useParams();
  const [finishedBook, setFinishedBook] = useState();
  const [highlights, setHighlights] = useState([]);
  const [fetchedHighlights, setFetchedHighlights] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (finishedBook && fetchedHighlights && !alert) {
      return;
    }
    if (!finishedBook) {
      getFinishedBook(id).then((retrievedFinishedBook) => {
        if (mounted) {
          setFinishedBook(retrievedFinishedBook);
        }
      });
    }
    if (!fetchedHighlights) {
      getFinishedBookHighlights(id).then((retrievedHighlights) => {
        if (mounted) {
          setHighlights(retrievedHighlights);
          setFetchedHighlights(true);
        }
      });
    }
    return () => (mounted = false);
  }, [alert, finishedBook, fetchedHighlights, id]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

  const handleDeleteFinishedBook = async (id) => {
    await deleteFinishedBook(id);
    navigate("/dashboard");
  };

  if (!finishedBook || !highlights) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Link
        to="/dashboard"
        className="text-xl text-gray-600 underline hover:text-black dark:text-neutral-100 dark:hover:text-indigo-200"
      >
        ← Back to dashboard
      </Link>
      <div className="mt-5 text-center">
        <img
          src={finishedBook.imageLink}
          alt="book cover"
          className="m-auto rounded-lg shadow-lg"
        />
        <h2 className="mt-5 text-3xl font-semibold">{finishedBook.title}</h2>
        {finishedBook.subtitle && (
          <h3 className="text-xl font-medium italic">
            {finishedBook.subtitle}
          </h3>
        )}
        <h4 className="mt-3 text-xl font-medium">
          {finishedBook.authors.join(", ")}
        </h4>
        <p>
          Categories:{" "}
          {finishedBook.categories.length ? (
            finishedBook.categories.join(", ")
          ) : (
            <span>None</span>
          )}
        </p>
        {finishedBook.pageCount && <p>{finishedBook.pageCount} pages</p>}
        <p>
          Date Finished:{" "}
          {moment.utc(finishedBook.dateFinished).format("MMMM D, YYYY")}
        </p>
        <div className="my-5">
          {alert && <h3>Action completed successfully</h3>}
          {!highlights.length ? (
            <HighlightsForm
              finishedBookId={finishedBook.id}
              setAlert={setAlert}
              setFetchedHighlights={setFetchedHighlights}
            />
          ) : (
            <div className="my-3">
              <Link
                to={`/finishedbooks/${finishedBook.id}`}
                className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 dark:bg-green-500/50 dark:hover:bg-green-700/50"
              >
                View Highlights
              </Link>
            </div>
          )}
          <button
            onClick={() => handleDeleteFinishedBook(finishedBook.id)}
            className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 dark:bg-red-500/50 dark:hover:bg-red-700/50"
          >
            Delete Finished Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFinishedBook;

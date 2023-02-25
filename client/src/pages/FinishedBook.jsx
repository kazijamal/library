import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFinishedBook } from "../services/finishedBooks";
import { getFinishedBookHighlights } from "../services/highlights";
import moment from "moment";

function FinishedBook() {
  const { id } = useParams();
  const [finishedBook, setFinishedBook] = useState();
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFinishedBook(id).then((retrievedFinishedBook) => {
      if (mounted) {
        setFinishedBook(retrievedFinishedBook);
      }
    });
    getFinishedBookHighlights(id).then((retrievedHighlights) => {
      if (mounted) {
        setHighlights(retrievedHighlights);
      }
    });
    return () => (mounted = false);
  }, [id]);

  if (!finishedBook || !highlights) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Link
        to="/"
        className="text-xl text-gray-600 underline hover:text-black dark:text-neutral-100 dark:hover:text-indigo-200"
      >
        ← Back to all books
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
        <p className="mb-5">
          Date Finished:{" "}
          {moment.utc(finishedBook.dateFinished).format("MMMM D, YYYY")}
        </p>
        <h3 className="mb-5 text-2xl font-semibold">Highlights</h3>
        {!highlights.length ? (
          <p>No highlights for this book</p>
        ) : (
          <ul className="m-auto w-full text-left md:w-3/4">
            {highlights.map((highlight) => (
              <li
                key={highlight.id}
                className="mx-2 mt-5 mb-3 rounded bg-indigo-100 p-2 dark:bg-indigo-500/25"
              >
                {highlight.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FinishedBook;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getReadingBook,
  markReadingBookFinished,
  deleteReadingBook,
} from "../services/readingBooks";

function EditReadingBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [readingBook, setReadingBook] = useState();
  const [dateFinished, setDateFinished] = useState("");

  useEffect(() => {
    let mounted = true;
    getReadingBook(id).then((retrievedReadingBook) => {
      if (mounted) {
        setReadingBook(retrievedReadingBook);
      }
    });
    return () => (mounted = false);
  }, [id]);

  const handleMarkReadingBookFinished = async (e) => {
    e.preventDefault();
    await markReadingBookFinished(id, dateFinished);
    navigate("/dashboard");
  };

  const handleDeleteReadingBook = async (id) => {
    await deleteReadingBook(id);
    navigate("/dashboard");
  };

  if (!readingBook) {
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
          src={readingBook.imageLink}
          alt="book cover"
          className="m-auto rounded-lg shadow-lg"
        />
        <h2 className="mt-5 text-3xl font-semibold">{readingBook.title}</h2>
        {readingBook.subtitle && (
          <h3 className="text-xl font-medium italic">{readingBook.subtitle}</h3>
        )}
        <h4 className="mt-3 text-xl font-medium">
          {readingBook.authors.join(", ")}
        </h4>
        <p>
          Categories:{" "}
          {readingBook.categories.length ? (
            readingBook.categories.join(", ")
          ) : (
            <span>None</span>
          )}
        </p>
        {readingBook.pageCount && <p>{readingBook.pageCount} pages</p>}
        <form onSubmit={handleMarkReadingBookFinished} className="my-5">
          <label>
            <p className="mt-3 text-xl font-medium">Date Finished</p>
            <input
              type="date"
              onChange={(e) => setDateFinished(e.target.value)}
              value={dateFinished}
              required
              className="my-3 rounded-md border border-gray-300 px-3 py-2 dark:border-none dark:bg-neutral-800"
            />
          </label>
          <br />
          <button
            type="submit"
            className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 dark:bg-green-500/50 dark:hover:bg-green-700/50"
          >
            Mark Reading Book as Finished
          </button>
        </form>
        <button
          onClick={() => handleDeleteReadingBook(readingBook.id)}
          className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 dark:bg-red-500/50 dark:hover:bg-red-700/50"
        >
          Delete Reading Book
        </button>
      </div>
    </div>
  );
}

export default EditReadingBook;

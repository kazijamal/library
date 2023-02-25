import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReadingBook } from "../services/readingBooks";

function ReadingBook() {
  const { id } = useParams();
  const [readingBook, setReadingBook] = useState();

  useEffect(() => {
    let mounted = true;
    getReadingBook(id).then((retrievedReadingBook) => {
      if (mounted) {
        setReadingBook(retrievedReadingBook);
      }
    });
    return () => (mounted = false);
  }, [id]);

  if (!readingBook) {
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
      </div>
    </div>
  );
}

export default ReadingBook;

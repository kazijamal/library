import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReadingBook } from "../services/readingBooks";
import BookDetailsSkeleton from "../components/Skeleton/BookDetailsSkeleton";

function ReadingBook() {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: readingBook,
  } = useQuery({
    queryKey: ["reading-book", id],
    queryFn: () => getReadingBook(id),
  });

  return (
    <div>
      <Link
        to="/"
        className="text-xl text-gray-100 underline underline-offset-2 hover:text-indigo-200"
      >
        ← Back to all books
      </Link>
      <div className="mt-5 text-center">
        {isLoading && <BookDetailsSkeleton />}
        {isError && <p>Error</p>}
        {readingBook && (
          <>
            <img
              src={readingBook.imageLink}
              alt="book cover"
              className="m-auto rounded-lg shadow-lg"
            />
            <h2 className="m-auto mt-5 max-w-lg text-3xl font-semibold">
              {readingBook.title}
            </h2>
            {readingBook.subtitle && (
              <h3 className="m-auto max-w-lg text-xl italic">
                {readingBook.subtitle}
              </h3>
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
          </>
        )}
      </div>
    </div>
  );
}

export default ReadingBook;

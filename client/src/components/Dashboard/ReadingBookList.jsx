import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "../../services/readingBooks";
import BookListSkeleton from "../Skeleton/BookListSkeleton";

function ReadingBookList() {
  const {
    isLoading,
    isError,
    data: readingBooks,
  } = useQuery({
    queryKey: ["reading-books"],
    queryFn: getReadingBooks,
  });

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">
        What I'm Currently Reading
      </h3>
      {isLoading && <BookListSkeleton numBooks={1} />}
      {isError && <p>Error</p>}
      {readingBooks && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {readingBooks.map((readingBook) => (
            <Link
              to={`/dashboard/readingbooks/edit/${readingBook.id}`}
              key={readingBook.id}
              className="mx-5 my-3 rounded-lg bg-white p-4 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-neutral-800"
            >
              <img
                src={readingBook.imageLink}
                alt="book cover"
                className="m-auto mb-3 w-full rounded-lg"
              />
              <p className="text-md text-center font-medium">
                {readingBook.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingBookList;

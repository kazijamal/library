import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "../services/readingBooks";
import BookListSkeleton from "./Skeleton/BookListSkeleton";
import BookCard from "./BookCard";

function ReadingBookList({ dashboard }) {
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
      <h3 className="my-3 text-2xl font-semibold">I'm Currently Reading</h3>
      {isLoading && <BookListSkeleton numBooks={1} />}
      {isError && <p>Error</p>}
      {readingBooks && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {readingBooks.map((readingBook) => (
            <BookCard
              key={readingBook.id}
              book={readingBook}
              type="reading-book"
              dashboard={dashboard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingBookList;

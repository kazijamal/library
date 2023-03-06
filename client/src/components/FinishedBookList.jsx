import { useQuery } from "@tanstack/react-query";
import { getFinishedBooks } from "../services/finishedBooks";
import BookListSkeleton from "./Skeleton/BookListSkeleton";
import BookCard from "./BookCard";

function FinishedBookList({ dashboard }) {
  const {
    isLoading,
    isError,
    data: finishedBooks,
  } = useQuery({
    queryKey: ["finished-books"],
    queryFn: getFinishedBooks,
  });

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">Books I've Read</h3>
      {isLoading && <BookListSkeleton numBooks={10} />}
      {isError && <p>Error</p>}
      {finishedBooks && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {finishedBooks.map((finishedBook) => (
            <BookCard
              key={finishedBook.id}
              book={finishedBook}
              type="finished-book"
              dashboard={dashboard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FinishedBookList;

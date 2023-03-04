import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFinishedBooks } from "../services/finishedBooks";
import BookListSkeleton from "./Skeleton/BookListSkeleton";

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
            <Link
              to={
                dashboard
                  ? `/dashboard/finishedbooks/edit/${finishedBook.id}`
                  : `/finishedbooks/${finishedBook.id}`
              }
              key={finishedBook.id}
              className="mx-5 my-3 rounded-lg bg-neutral-800 p-4 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={finishedBook.imageLink}
                alt="book cover"
                className="m-auto mb-3 w-full rounded-lg"
              />
              <p className="text-md text-center font-medium">
                {finishedBook.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FinishedBookList;

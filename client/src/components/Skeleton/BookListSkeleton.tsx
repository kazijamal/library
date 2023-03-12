import BookSkeleton from "./BookSkeleton";

function BookListSkeleton({ numBooks }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(numBooks).keys()].map((n) => (
        <BookSkeleton key={n} />
      ))}
    </div>
  );
}

export default BookListSkeleton;

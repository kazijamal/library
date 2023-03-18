function BookCardSkeleton() {
  return (
    <div className="mx-5 my-3 animate-pulse rounded-lg bg-gray-800 p-4 shadow-lg">
      <div className="aspect-w-2 aspect-h-3 mb-4 flex w-full rounded-lg bg-gray-700"></div>
      <div className="mb-3 h-3 w-full rounded-full bg-gray-700"></div>
    </div>
  );
}

export default BookCardSkeleton;

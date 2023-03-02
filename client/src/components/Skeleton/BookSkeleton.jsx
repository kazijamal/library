function BookSkeleton() {
  return (
    <div className="mx-5 my-3 animate-pulse rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-800">
      <div className="aspect-w-2 aspect-h-3 mb-4 flex w-full rounded-lg bg-neutral-300 dark:bg-neutral-700"></div>
      <div className="mb-3 h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
    </div>
  );
}

export default BookSkeleton;

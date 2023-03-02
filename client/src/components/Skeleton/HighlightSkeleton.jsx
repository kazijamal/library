function HighlightSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mx-2 mt-5 mb-2 rounded bg-indigo-100 p-3 dark:bg-indigo-500/25">
        <div className="mb-3 h-2 w-full rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="mb-3 h-2 w-full rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="mb-3 h-2 w-full rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
        <div className="h-2 w-full rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
      </div>
      <div className="mx-3 mt-3 mb-5 h-3 w-48 rounded-full bg-neutral-400 dark:bg-neutral-500"></div>
    </div>
  );
}

export default HighlightSkeleton;

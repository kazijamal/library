type HighlightSkeletonProps = {
  includeBook: boolean;
};

function HighlightSkeleton({ includeBook }: HighlightSkeletonProps) {
  return (
    <div className="animate-pulse">
      <div className="mx-2 mt-5 mb-2 rounded-lg bg-indigo-500/25 p-3">
        <div className="mb-3 h-2 w-full rounded-full bg-gray-600"></div>
        <div className="mb-3 h-2 w-full rounded-full bg-gray-600"></div>
        <div className="mb-3 h-2 w-full rounded-full bg-gray-600"></div>
        <div className="h-2 w-full rounded-full bg-gray-600"></div>
      </div>
      {includeBook && (
        <div className="mx-3 mt-3 mb-5 h-3 w-48 rounded-full bg-gray-500"></div>
      )}
    </div>
  );
}

export default HighlightSkeleton;

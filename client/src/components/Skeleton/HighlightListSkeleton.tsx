import HighlightSkeleton from "./HighlightSkeleton";

type HighlightListSkeletonProps = {
  numHighlights: number;
  includeBook: boolean;
};

function HighlightListSkeleton({
  numHighlights,
  includeBook,
}: HighlightListSkeletonProps) {
  return (
    <div className="m-auto w-full text-left md:w-3/4">
      {[...Array(numHighlights).keys()].map((n) => (
        <HighlightSkeleton key={n} includeBook={includeBook} />
      ))}
    </div>
  );
}

export default HighlightListSkeleton;

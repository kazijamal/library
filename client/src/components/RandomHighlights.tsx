import { useQuery } from "@tanstack/react-query";
import { getRandomHighlights } from "../services/highlights";
import Highlight from "./Highlight";
import HighlightSkeleton from "./Skeleton/HighlightSkeleton";
import { Highlight as HighlightType, FinishedBook } from "@prisma/client";

type HighlightWithBook = HighlightType & {
  finishedBook: FinishedBook;
};

function RandomHighlights() {
  const {
    isFetching,
    isError,
    data: randomHighlights,
  } = useQuery({
    queryKey: ["random-highlights"],
    queryFn: () => getRandomHighlights(1),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">Random Highlight</h3>
      {isFetching && <HighlightSkeleton includeBook={true} />}
      {isError && <p>Error</p>}
      {!isFetching && randomHighlights && (
        <div className="w-full text-left">
          {randomHighlights.map((highlight: HighlightWithBook) => (
            <Highlight
              key={highlight.id}
              highlight={highlight}
              includeBook={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RandomHighlights;

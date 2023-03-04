import { useQuery } from "@tanstack/react-query";
import { getRandomHighlights } from "../services/highlights";
import Highlight from "./Highlight";
import HighlightSkeleton from "./Skeleton/HighlightSkeleton";

function RandomHighlights() {
  const {
    isLoading,
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
      {isLoading && <HighlightSkeleton includeBook={true} />}
      {isError && <p>Error</p>}
      {randomHighlights && (
        <div className="w-full text-left">
          {randomHighlights.map((highlight) => (
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

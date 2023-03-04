import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchHighlights } from "../services/highlights";
import Highlight from "../components/Highlight";
import HighlightListSkeleton from "../components/Skeleton/HighlightListSkeleton";

function SearchHighlightsResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const {
    isLoading,
    isError,
    data: highlights,
  } = useQuery({
    queryKey: ["search-highlights", query],
    queryFn: () => searchHighlights(query),
  });

  return (
    <div>
      <Link
        to="/"
        className="text-xl text-neutral-100 underline hover:text-indigo-200"
      >
        ← Back to home
      </Link>
      <div className="my-5">
        <h3 className="my-3 text-2xl font-semibold">
          Highlights containing "{query}"
        </h3>
        {isLoading && (
          <HighlightListSkeleton numHighlights={5} includeBook={true} />
        )}
        {isError && <p>Error</p>}
        {highlights && highlights.length == 0 ? (
          <p>No highlights found containing "{query}"</p>
        ) : (
          highlights && (
            <div className="m-auto w-full text-left md:w-3/4">
              {highlights.map((highlight) => (
                <Highlight
                  key={highlight.id}
                  highlight={highlight}
                  includeBook={true}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchHighlightsResults;

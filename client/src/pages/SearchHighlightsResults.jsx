import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchHighlights } from "../services/highlights";
import { ScaleLoader } from "react-spinners";
import Highlight from "../components/Highlight";

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
        className="text-xl text-gray-600 underline hover:text-black dark:text-neutral-100 dark:hover:text-indigo-200"
      >
        ← Back to home
      </Link>
      <div className="my-5">
        <h3 className="my-3 text-2xl font-semibold">
          Highlights containing "{query}"
        </h3>
        {isLoading && <ScaleLoader />}
        {isError && <p>Error</p>}
        {highlights && (
          <div className="w-full text-left">
            {highlights.map((highlight) => (
              <Highlight key={highlight.id} highlight={highlight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchHighlightsResults;

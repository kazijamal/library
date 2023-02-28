import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchHighlights } from "../services/highlights";
import { ScaleLoader } from "react-spinners";

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
          <ul className="w-full text-left">
            {highlights.map((highlight) => (
              <div key={highlight.id}>
                <li className="mx-2 mt-5 mb-2 rounded bg-indigo-100 p-2 dark:bg-indigo-500/25">
                  {highlight.content}
                </li>
                <p className="text-md mx-3 mb-5">
                  Highlight from{" "}
                  <Link
                    to={`/finishedbooks/${highlight.finishedBook.id}`}
                    className="font-medium hover:underline dark:hover:text-indigo-200"
                  >
                    {highlight.finishedBook.title}
                  </Link>
                </p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchHighlightsResults;

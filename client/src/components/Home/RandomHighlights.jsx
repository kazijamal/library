import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRandomHighlights } from "../../services/highlights";
import { ScaleLoader } from "react-spinners";

function RandomHighlights() {
  const {
    isLoading,
    isError,
    data: randomHighlights,
  } = useQuery({
    queryKey: ["random-highlights"],
    queryFn: () => getRandomHighlights(2),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">Random Highlights</h3>
      {isLoading && <ScaleLoader />}
      {isError && <p>Error</p>}
      {randomHighlights && (
        <ul className="w-full text-left">
          {randomHighlights.map((highlight) => (
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
  );
}

export default RandomHighlights;

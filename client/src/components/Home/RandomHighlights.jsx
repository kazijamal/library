import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomHighlights } from "../../services/highlights";

function RandomHighlights() {
  const [randomHighlights, setRandomHighlights] = useState([]);

  useEffect(() => {
    let mounted = true;
    getRandomHighlights(2).then((retrievedRandomHighlights) => {
      if (mounted) {
        setRandomHighlights(retrievedRandomHighlights);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">Highlights of the Day</h3>
      {randomHighlights ? (
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
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default RandomHighlights;

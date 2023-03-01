import { useQuery } from "@tanstack/react-query";
import { getRandomHighlights } from "../../services/highlights";
import { ScaleLoader } from "react-spinners";
import Highlight from "../Highlight";

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
      {isLoading && <ScaleLoader />}
      {isError && <p>Error</p>}
      {randomHighlights && (
        <ul className="w-full text-left">
          {randomHighlights.map((highlight) => (
            <Highlight key={highlight.id} highlight={highlight} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default RandomHighlights;

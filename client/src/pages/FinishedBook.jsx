import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFinishedBook } from "../services/finishedBooks";
import { getFinishedBookHighlights } from "../services/highlights";
import { ScaleLoader } from "react-spinners";
import Highlight from "../components/Highlight";
import moment from "moment";
import HighlightListSkeleton from "../components/Skeleton/HighlightListSkeleton";

function FinishedBook() {
  const { id } = useParams();

  const {
    isLoading: finishedBookIsLoading,
    isError: finishedBookIsError,
    data: finishedBook,
  } = useQuery({
    queryKey: ["finished-book", id],
    queryFn: () => getFinishedBook(id),
  });

  const {
    isLoading: highlightsIsLoading,
    isError: highlightsIsError,
    data: highlights,
  } = useQuery({
    queryKey: ["finished-book-highlights", id],
    queryFn: () => getFinishedBookHighlights(id),
  });

  return (
    <div>
      <Link
        to="/"
        className="text-xl text-neutral-100 underline hover:text-indigo-200"
      >
        ← Back to all books
      </Link>
      <div className="mt-5 text-center">
        {finishedBookIsLoading && <ScaleLoader></ScaleLoader>}
        {finishedBookIsError && <p>Error</p>}
        {finishedBook && (
          <>
            <img
              src={finishedBook.imageLink}
              alt="book cover"
              className="m-auto rounded-lg shadow-lg"
            />
            <h2 className="mt-5 text-3xl font-semibold">
              {finishedBook.title}
            </h2>
            {finishedBook.subtitle && (
              <h3 className="text-xl font-medium italic">
                {finishedBook.subtitle}
              </h3>
            )}
            <h4 className="mt-3 text-xl font-medium">
              {finishedBook.authors.join(", ")}
            </h4>
            <p>
              Categories:{" "}
              {finishedBook.categories.length ? (
                finishedBook.categories.join(", ")
              ) : (
                <span>None</span>
              )}
            </p>
            {finishedBook.pageCount && <p>{finishedBook.pageCount} pages</p>}
            <p className="mb-5">
              Date Finished:{" "}
              {moment.utc(finishedBook.dateFinished).format("MMMM D, YYYY")}
            </p>
          </>
        )}
        <h3 className="mb-5 text-2xl font-semibold">Highlights</h3>
        {highlightsIsLoading && (
          <HighlightListSkeleton numHighlights={5} includeBook={false} />
        )}
        {highlightsIsError && <p>Error</p>}
        {highlights && highlights.length == 0 ? (
          <p>No highlights for this book</p>
        ) : (
          highlights && (
            <div className="m-auto w-full text-left md:w-3/4">
              {highlights.map((highlight) => (
                <Highlight
                  key={highlight.id}
                  highlight={highlight}
                  includeBook={false}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FinishedBook;

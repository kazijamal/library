import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFinishedBook } from "../services/finishedBooks";
import { getFinishedBookHighlights } from "../services/highlights";
import Highlight from "../components/Highlight";
import moment from "moment";
import BookDetailsSkeleton from "../components/Skeleton/BookDetailsSkeleton";
import HighlightListSkeleton from "../components/Skeleton/HighlightListSkeleton";
import { Highlight as HighlightType } from "@prisma/client";
import NavigateLink from "../components/NavigateLink";
import ScrollToTop from "react-scroll-up";

function FinishedBook() {
  const params = useParams();
  const id = Number(params.id);

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
      <NavigateLink to="/" text="Back to home" />
      <div className="mt-5 text-center">
        {finishedBookIsLoading && <BookDetailsSkeleton />}
        {finishedBookIsError && <p>Error</p>}
        {finishedBook && (
          <>
            <img
              src={finishedBook.imageLink}
              alt="book cover"
              className="m-auto rounded-lg shadow-lg"
              width="128"
              height="193"
            />
            <h2 className="m-auto mt-5 max-w-lg text-3xl font-semibold">
              {finishedBook.title}
            </h2>
            {finishedBook.subtitle && (
              <h3 className="m-auto max-w-lg text-xl italic">
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

        {highlightsIsLoading && (
          <>
            <div className="mx-auto my-3 h-6 w-36 rounded-full bg-gray-500"></div>
            <HighlightListSkeleton numHighlights={5} includeBook={false} />
          </>
        )}

        {highlightsIsError && <p>Error</p>}

        {highlights && highlights.length == 0 ? (
          <>
            <h3 className="mb-5 text-2xl font-semibold">
              {highlights.length} Highlights
            </h3>
            <p>No highlights for this book</p>
          </>
        ) : (
          highlights && (
            <>
              <h3 className="mb-5 text-2xl font-semibold">
                {highlights.length} Highlights
              </h3>
              <div className="m-auto w-full text-left md:w-3/4">
                {highlights.map((highlight: HighlightType) => (
                  <Highlight
                    key={highlight.id}
                    highlight={highlight}
                    includeBook={false}
                  />
                ))}
              </div>
            </>
          )
        )}
      </div>

      <ScrollToTop showUnder={600}>
        <div className="rounded-full bg-gray-700 p-2 shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </div>
      </ScrollToTop>
    </div>
  );
}

export default FinishedBook;

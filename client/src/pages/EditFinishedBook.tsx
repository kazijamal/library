import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinishedBook, deleteFinishedBook } from "../services/finishedBooks";
import {
  getFinishedBookHighlights,
  deleteHighlightsForFinishedBook,
} from "../services/highlights";
import HighlightsForm from "../components/HighlightsForm";
import { ScaleLoader } from "react-spinners";
import moment from "moment";
import BookDetailsSkeleton from "../components/Skeleton/BookDetailsSkeleton";
import NavigateLink from "../components/NavigateLink";

function EditFinishedBook() {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  const queryClient = useQueryClient();

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

  const deleteFinishedBookMutation = useMutation({
    mutationFn: deleteFinishedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finished-books"] });
      navigate("/dashboard");
    },
  });

  const deleteHighlightsForFinishedBookMutation = useMutation({
    mutationFn: deleteHighlightsForFinishedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finished-book-highlights", id],
      });
    },
  });

  const handleDeleteFinishedBook = (id: number) => {
    deleteFinishedBookMutation.mutate({ id });
  };

  const handleDeleteHighlightsForFinishedBook = (id: number) => {
    deleteHighlightsForFinishedBookMutation.mutate({ id });
  };

  return (
    <div>
      <NavigateLink to="/dashboard" text="Back to dashboard" />
      <div className="mt-5 text-center">
        {finishedBookIsLoading && <BookDetailsSkeleton />}
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
            <p>
              Date Finished:{" "}
              {moment.utc(finishedBook.dateFinished).format("MMMM D, YYYY")}
            </p>
          </>
        )}

        <div className="my-5">
          {highlightsIsLoading && <ScaleLoader></ScaleLoader>}
          {highlightsIsError && <p>Error</p>}
          {highlights && highlights.length == 0 ? (
            <HighlightsForm finishedBookId={id} />
          ) : (
            highlights && (
              <>
                <div className="my-3">
                  <Link
                    to={`/finishedbooks/${finishedBook.id}`}
                    className="rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
                  >
                    View Highlights
                  </Link>
                </div>
                <div className="my-3">
                  {deleteHighlightsForFinishedBookMutation.isLoading ? (
                    <ScaleLoader></ScaleLoader>
                  ) : (
                    <button
                      onClick={() =>
                        handleDeleteHighlightsForFinishedBook(finishedBook.id)
                      }
                      className="rounded bg-red-500/50 py-2 px-4 font-bold text-white hover:bg-red-700/50"
                    >
                      Delete Highlights
                    </button>
                  )}
                </div>
              </>
            )
          )}

          <div className="my-3">
            {deleteFinishedBookMutation.isLoading ? (
              <ScaleLoader></ScaleLoader>
            ) : (
              <button
                onClick={() => handleDeleteFinishedBook(finishedBook.id)}
                className="rounded bg-red-500/50 py-2 px-4 font-bold text-white hover:bg-red-700/50"
              >
                Delete Finished Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFinishedBook;

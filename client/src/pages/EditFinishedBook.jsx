import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinishedBook, deleteFinishedBook } from "../services/finishedBooks";
import { getFinishedBookHighlights } from "../services/highlights";
import HighlightsForm from "../components/HighlightsForm";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

function EditFinishedBook() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleDeleteFinishedBook = (id) => {
    deleteFinishedBookMutation.mutate({ id });
  };

  return (
    <div>
      <Link
        to="/dashboard"
        className="text-xl text-neutral-100 underline hover:text-indigo-200"
      >
        ← Back to dashboard
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
              <div className="my-3">
                <Link
                  to={`/finishedbooks/${finishedBook.id}`}
                  className="rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
                >
                  View Highlights
                </Link>
              </div>
            )
          )}

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
  );
}

export default EditFinishedBook;

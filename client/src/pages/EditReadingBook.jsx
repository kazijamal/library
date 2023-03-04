import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReadingBook,
  markReadingBookFinished,
  deleteReadingBook,
} from "../services/readingBooks";
import { ScaleLoader } from "react-spinners";

function EditReadingBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dateFinished, setDateFinished] = useState("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: readingBook,
  } = useQuery({
    queryKey: ["reading-book", id],
    queryFn: () => getReadingBook(id),
  });

  const markReadingBookFinishedMutation = useMutation({
    mutationFn: markReadingBookFinished,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reading-books", "finished-books"],
      });
      navigate("/dashboard");
    },
  });

  const deleteReadingBookMutation = useMutation({
    mutationFn: deleteReadingBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reading-books"] });
      navigate("/dashboard");
    },
  });

  const handleMarkReadingBookFinished = (e) => {
    e.preventDefault();
    markReadingBookFinishedMutation.mutate({ id, dateFinished });
  };

  const handleDeleteReadingBook = (id) => {
    deleteReadingBookMutation.mutate({ id });
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
        {isLoading && <ScaleLoader></ScaleLoader>}
        {isError && <p>Error</p>}
        {readingBook && (
          <>
            <img
              src={readingBook.imageLink}
              alt="book cover"
              className="m-auto rounded-lg shadow-lg"
            />
            <h2 className="mt-5 text-3xl font-semibold">{readingBook.title}</h2>
            {readingBook.subtitle && (
              <h3 className="text-xl font-medium italic">
                {readingBook.subtitle}
              </h3>
            )}
            <h4 className="mt-3 text-xl font-medium">
              {readingBook.authors.join(", ")}
            </h4>
            <p>
              Categories:{" "}
              {readingBook.categories.length ? (
                readingBook.categories.join(", ")
              ) : (
                <span>None</span>
              )}
            </p>
            {readingBook.pageCount && <p>{readingBook.pageCount} pages</p>}

            {markReadingBookFinishedMutation.isLoading ? (
              <ScaleLoader></ScaleLoader>
            ) : (
              <form onSubmit={handleMarkReadingBookFinished} className="my-5">
                <label>
                  <p className="mt-3 text-xl font-medium">Date Finished</p>
                  <input
                    type="date"
                    onChange={(e) => setDateFinished(e.target.value)}
                    value={dateFinished}
                    required
                    className="my-3 rounded-md border border-none bg-neutral-800 px-3 py-2"
                  />
                </label>
                <br />
                <button
                  type="submit"
                  className="rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
                >
                  Mark Reading Book as Finished
                </button>
              </form>
            )}

            {deleteReadingBookMutation.isLoading ? (
              <ScaleLoader></ScaleLoader>
            ) : (
              <button
                onClick={() => handleDeleteReadingBook(readingBook.id)}
                className="rounded bg-red-500/50 py-2 px-4 font-bold text-white hover:bg-red-700/50"
              >
                Delete Reading Book
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EditReadingBook;

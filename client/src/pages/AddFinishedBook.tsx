import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFinishedBook } from "../services/finishedBooks";
import { ScaleLoader } from "react-spinners";

function AddFinishedBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dateFinished, setDateFinished] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createFinishedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["finished-books"] });
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, dateFinished });
  };

  return (
    <div>
      <div className="m-auto w-full rounded-2xl bg-gray-800 p-10 shadow-xl md:w-1/2">
        <h1 className="mb-5 text-center text-3xl font-semibold">
          Add Finished Book
        </h1>
        {mutation.isLoading ? (
          <div className="m-auto text-center">
            <ScaleLoader></ScaleLoader>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              <p className="text-lg font-medium">Title</p>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                className="my-3 w-full rounded-md border border-none bg-gray-900 px-3 py-2"
              />
            </label>
            <label>
              <p className="text-lg font-medium">Date Finished</p>
              <input
                type="date"
                onChange={(e) => setDateFinished(e.target.value)}
                value={dateFinished}
                required
                className="my-3 w-full rounded-md border border-none bg-gray-900 px-3 py-2"
              />
            </label>
            <div className="grid place-items-center">
              <button
                type="submit"
                className="mx-auto mt-5 rounded bg-green-500 bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddFinishedBook;

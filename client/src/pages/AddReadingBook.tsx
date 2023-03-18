import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReadingBook } from "../services/readingBooks";
import { ScaleLoader } from "react-spinners";

function AddReadingBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReadingBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reading-books"] });
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <div className="m-auto w-full rounded-2xl bg-gray-800 p-10 shadow-xl md:w-1/2">
      <h1 className="mb-5 text-center text-3xl font-semibold">
        Add Reading Book
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
          <div className="grid place-items-center">
            <button
              type="submit"
              className="mx-auto mt-5 rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddReadingBook;

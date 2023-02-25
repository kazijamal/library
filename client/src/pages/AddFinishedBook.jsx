import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFinishedBook } from "../services/finishedBooks";

function AddFinishedBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dateFinished, setDateFinished] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFinishedBook(title, dateFinished);
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="m-auto w-full rounded-2xl bg-white p-10 shadow-xl dark:bg-neutral-800 md:w-1/2">
        <h1 className="mb-5 text-center text-3xl font-semibold">
          Add Finished Book
        </h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p className="text-lg font-medium">Title</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className="my-3 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-none dark:bg-neutral-900"
            />
          </label>
          <label>
            <p className="text-lg font-medium">Date Finished</p>
            <input
              type="date"
              onChange={(e) => setDateFinished(e.target.value)}
              value={dateFinished}
              required
              className="my-3 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-none dark:bg-neutral-900"
            />
          </label>
          <div className="grid place-items-center">
            <button
              type="submit"
              className="mx-auto mt-5 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 dark:bg-green-500/50 dark:hover:bg-green-700/50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFinishedBook;

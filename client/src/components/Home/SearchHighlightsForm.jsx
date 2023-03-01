import { useState } from "react";
import { useNavigate } from "react-router";

function SearchHighlightsForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/highlights/search?q=${query}`);
  };

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">Search Highlights</h3>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-gray-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Search for highlights containing..."
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchHighlightsForm;

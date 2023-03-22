import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { countHighlights } from "../services/highlights";

function SearchHighlightsForm() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const {
    isLoading,
    isError,
    data: numHighlights,
  } = useQuery({
    queryKey: ["num-highlights"],
    queryFn: countHighlights,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/highlights/search?q=${query}`);
  };

  return (
    <div className="my-5 mx-2">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
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
            className="block w-full rounded-lg bg-gray-800 p-4 pl-10 text-white placeholder-gray-400"
            placeholder={
              isLoading ? "" : `Search ${numHighlights} highlights...`
            }
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchHighlightsForm;

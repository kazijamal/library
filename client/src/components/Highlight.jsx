import { Link } from "react-router-dom";

function Highlight({ highlight, includeBook }) {
  return (
    <div>
      <p className="mx-2 mt-5 mb-2 rounded-lg bg-indigo-500/25 p-3">
        {highlight.content}
      </p>
      {includeBook && (
        <p className="text-md mx-3 mb-5">
          Highlight from{" "}
          <Link
            to={`/finishedbooks/${highlight.finishedBook.id}`}
            className="font-medium hover:text-indigo-200 hover:underline"
          >
            {highlight.finishedBook.title}
          </Link>
        </p>
      )}
    </div>
  );
}

export default Highlight;

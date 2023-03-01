import { Link } from "react-router-dom";

function Highlight({ highlight }) {
  return (
    <div>
      <li className="mx-2 mt-5 mb-2 rounded bg-indigo-100 p-2 dark:bg-indigo-500/25">
        {highlight.content}
      </li>
      <p className="text-md mx-3 mb-5">
        Highlight from{" "}
        <Link
          to={`/finishedbooks/${highlight.finishedBook.id}`}
          className="font-medium hover:underline dark:hover:text-indigo-200"
        >
          {highlight.finishedBook.title}
        </Link>
      </p>
    </div>
  );
}

export default Highlight;

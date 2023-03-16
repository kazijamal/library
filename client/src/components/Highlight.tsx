import { Link } from "react-router-dom";
import { Highlight as HighlightType, FinishedBook } from "@prisma/client";

type HighlightWithBook = HighlightType & {
  finishedBook: FinishedBook;
};

type HighlightProps = {
  highlight: HighlightType | HighlightWithBook;
  includeBook: boolean;
};

function Highlight({ highlight, includeBook }: HighlightProps) {
  return (
    <div>
      <p className="mx-2 mt-5 mb-2 rounded-lg bg-indigo-500/25 p-3">
        {highlight.content}
      </p>
      {includeBook && (
        <p className="text-md mx-3 mb-5">
          Highlight from{" "}
          <Link
            to={`/finishedbooks/${
              (highlight as HighlightWithBook).finishedBook.id
            }`}
            className="underline underline-offset-2 hover:text-indigo-200"
          >
            {(highlight as HighlightWithBook).finishedBook.title}
          </Link>
        </p>
      )}
    </div>
  );
}

export default Highlight;

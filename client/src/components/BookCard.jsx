import { Link } from "react-router-dom";

const getLink = (book, type, dashboard) => {
  if (type == "reading-book") {
    return dashboard
      ? `/dashboard/readingbooks/edit/${book.id}`
      : `/readingbooks/${book.id}`;
  } else if (type == "finished-book") {
    return dashboard
      ? `/dashboard/finishedbooks/edit/${book.id}`
      : `/finishedbooks/${book.id}`;
  }
};

function BookCard({ book, type, dashboard }) {
  return (
    <Link
      to={getLink(book, type, dashboard)}
      key={book.id}
      className="mx-5 my-3 rounded-lg border border-neutral-700 bg-neutral-800 p-4 transition-colors delay-75 ease-in-out hover:bg-indigo-500/10"
    >
      <img
        src={book.imageLink}
        alt="book cover"
        className="m-auto mb-3 w-full rounded-lg"
      />
      <p className="text-md text-center font-medium">{book.title}</p>
    </Link>
  );
}

export default BookCard;

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
      className="mx-5 my-3 rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700 hover:text-white hover:shadow-lg"
    >
      <img
        src={book.imageLink}
        alt="book cover"
        className="m-auto mb-3 w-full rounded-md"
      />
      <p className="text-md text-center font-medium">{book.title}</p>
    </Link>
  );
}

export default BookCard;

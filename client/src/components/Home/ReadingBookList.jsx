import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReadingBooks } from "../../services/readingBooks";

function ReadingBookList() {
  const [readingBooks, setReadingBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    getReadingBooks().then((retrievedReadingBooks) => {
      if (mounted) {
        setReadingBooks(retrievedReadingBooks);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">
        What I'm Currently Reading
      </h3>
      {readingBooks ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {readingBooks.map((readingBook) => (
            <Link
              to={`/readingbooks/${readingBook.id}`}
              key={readingBook.id}
              className="mx-5 my-3 rounded-lg bg-white p-4 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-neutral-800"
            >
              <img
                src={readingBook.imageLink}
                alt="book cover"
                className="m-auto mb-3 w-full rounded-lg"
              />
              <p className="text-md text-center font-medium">
                {readingBook.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default ReadingBookList;

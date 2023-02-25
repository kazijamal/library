import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFinishedBooks } from "../../services/finishedBooks";

function FinishedBookList() {
  const [finishedBooks, setFinishedBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFinishedBooks().then((retrievedFinishedBooks) => {
      if (mounted) {
        setFinishedBooks(retrievedFinishedBooks);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="my-5">
      <h3 className="my-3 text-2xl font-semibold">
        Books I've Finished Reading
      </h3>
      {finishedBooks ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {finishedBooks.map((finishedBook) => (
            <Link
              to={`/finishedbooks/${finishedBook.id}`}
              key={finishedBook.id}
              className="mx-5 my-3 rounded-lg bg-white p-4 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-neutral-800"
            >
              <img
                src={finishedBook.imageLink}
                alt="book cover"
                className="m-auto mb-3 w-full rounded-lg"
              />
              <p className="text-md text-center font-medium">
                {finishedBook.title}
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

export default FinishedBookList;

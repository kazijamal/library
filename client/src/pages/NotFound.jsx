import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <Link
        to="/"
        className="text-xl text-neutral-100 underline hover:text-indigo-200"
      >
        ← Back home
      </Link>
      <div className="mt-5 text-center">
        <h2 className="mt-5 text-3xl font-semibold">Page Not Found</h2>
      </div>
    </div>
  );
}

export default NotFound;

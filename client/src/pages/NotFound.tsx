import NavigateLink from "../components/NavigateLink";

function NotFound() {
  return (
    <div>
      <NavigateLink to="/" text="Back to home" />
      <div className="mt-5 text-center">
        <h2 className="mt-5 text-3xl font-semibold">Page Not Found</h2>
      </div>
    </div>
  );
}

export default NotFound;

import { Link } from "react-router-dom";

type NavigateLinkProps = {
  to: string;
  text: string;
};

function NavigateLink({ to, text }: NavigateLinkProps) {
  return (
    <Link
      to={to}
      className="text-xl text-gray-100 underline underline-offset-4 hover:text-indigo-200"
    >
      ← {text}
    </Link>
  );
}

export default NavigateLink;

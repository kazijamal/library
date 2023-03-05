import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="m-auto max-w-6xl px-3 py-5 text-neutral-100">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;

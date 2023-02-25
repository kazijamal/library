import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  return (
    <div className="relative mb-5 flex items-center justify-between">
      <h1 className="select-none bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
        Kazi's Library
      </h1>
      <DarkModeToggle />
    </div>
  );
}

export default Navbar;

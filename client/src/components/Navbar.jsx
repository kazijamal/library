import DarkModeToggle from './DarkModeToggle';

function Navbar() {
  return (
    <div className='relative flex items-center justify-between mb-5'>
      <h1 className='select-none text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600'>
        Kazi's Library
      </h1>
      <DarkModeToggle />
    </div>
  );
}

export default Navbar;

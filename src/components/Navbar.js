import React from 'react';
import Logo from './Logo';
import Route from './Route';
import { MdMenu, MdClose  } from "react-icons/md";

function Navbar({responsive, handleShowMenu, toggleMenu, handleCloseMenu}) {


  return (
    <nav className='w-full bg-rose-900 justify-between fixed top-0 left-0 z-10 flex p-2 items-center py-5 px-4'>
      <Logo />
      {responsive && (
  !toggleMenu ? (
    <MdMenu
      className='text-white text-6xl absolute right-10 cursor-pointer'
      onClick={handleShowMenu}
    />
  ) : (
    <MdClose
      className='text-white text-6xl absolute right-10 cursor-pointer'
      onClick={handleCloseMenu}
    />
  )
)}
      <Route  toggleMenu={toggleMenu} responsive={responsive}/>
    </nav>
  );
}

export default Navbar;

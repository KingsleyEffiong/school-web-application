import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Route({toggleMenu, responsive, handleCloseMenu}) {
  return (
    <div>
  {  !toggleMenu && !responsive  &&  <ul className='flex justify-around items-center gap-2 max-[954px]:hidden' >
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <NavLink to='program' className={({ isActive }) => 
          isActive 
            ? 'text-rose-900 font-bold' 
            : 'text-gray-600'
        }>Our Programs</NavLink>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <NavLink to='offer' className={({ isActive }) => 
          isActive 
            ? 'text-rose-900 font-bold' 
            : 'text-gray-600'
        }>What We Offer</NavLink>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <NavLink to='contact'className={({ isActive }) => 
          isActive 
            ? 'text-rose-900 font-bold' 
            : 'text-gray-600'
        }>Contact Us</NavLink>
    </li>
    </ul>}

    {toggleMenu && responsive && 
      <ul className={`flex flex-col justify-around items-center gap-2 fixed top-32 left-0 bg-rose-900 w-[100%] h-auto py-5 px-4 ${toggleMenu ? 'animate-drop'  : 'animate-top'}`}>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 ${toggleMenu && responsive ? "hover:bg-none" : 'hover:bg-amber-500 hover: transition-all ease-in-out duration-1000' }`} onClick={handleCloseMenu}>
        <NavLink to='program' className={({ isActive }) => 
          isActive 
            ? 'text-white font-bold' 
            : 'text-rose-500'
        }>Our Programs</NavLink>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 ${toggleMenu && responsive ? "hover:bg-none" : 'hover:bg-amber-500 hover: transition-all ease-in-out duration-1000' }`} onClick={handleCloseMenu}>
        <NavLink to='offer' className={({ isActive }) => 
          isActive 
            ? 'text-white font-bold' 
            : 'text-rose-500'
        }>What We Offer</NavLink>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 ${toggleMenu && responsive ? "hover:bg-none" : 'hover:bg-amber-500 hover: transition-all ease-in-out duration-1000' }`} onClick={handleCloseMenu}>
        <NavLink to='contact' className={({ isActive }) => 
          isActive 
            ? 'text-white font-bold' 
            : 'text-rose-500'
        }>Contact Us</NavLink>
      </li>
      </ul>
    }
    </div>
  )
}

export default Route
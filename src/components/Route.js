import React from 'react'
import { Link } from 'react-router-dom'

function Route({toggleMenu, responsive}) {
  return (
    <div>
  {  !toggleMenu && !responsive  &&  <ul className='flex justify-around items-center gap-2 max-[954px]:hidden' >
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <Link to='program'>Our Programs</Link>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <Link to='offer'>What We Offer</Link>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <Link to='contact'>Contact Us</Link>
    </li>
    </ul>}

    {toggleMenu && responsive && 
      <ul className={`flex flex-col justify-around items-center gap-2 fixed top-32 left-0 bg-rose-900 w-[100%] h-auto py-5 px-4 ${toggleMenu ? 'animate-drop'  : 'animate-top'}`}>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <Link to='program'>Our Programs</Link>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <Link to='offer'>What We Offer</Link>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <Link to='contact'>Contact Us</Link>
      </li>
      </ul>
    }
    </div>
  )
}

export default Route
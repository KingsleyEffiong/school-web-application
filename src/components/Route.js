import React from 'react'

function Route({toggleMenu, responsive}) {
  return (
    <div>
  {  !toggleMenu && !responsive  &&  <ul className='flex justify-around items-center gap-2 max-[954px]:hidden' >
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <a href='program'>Our Programs</a>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <a href='offer'>What We Offer</a>
    </li>
    <li className='bg-white py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000 animate-scaleUpCenter'>
      <a href='contact'>Contact Us</a>
    </li>
    </ul>}

    {toggleMenu && responsive && 
      <ul className={`flex flex-col justify-around items-center gap-2 fixed top-32 left-0 bg-rose-900 w-[100%] h-auto py-5 px-4 ${toggleMenu ? 'animate-drop'  : 'animate-top'}`}>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <a href='program'>Our Programs</a>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <a href='offer'>What We Offer</a>
      </li>
      <li className={`${responsive ? 'bg-none text-white text-center decoration-slate-50 underline' : 'bg-white'} py-5 px-4 hover:bg-amber-500 hover: transition-all ease-in-out duration-1000`}>
        <a href='contact'>Contact Us</a>
      </li>
      </ul>
    }
    </div>
  )
}

export default Route
import React, { useState } from 'react';
import { AiFillMessage } from 'react-icons/ai';


function Home({dispatch, handleShowChat}) {
  const [hoverChat, setHoverChats] = useState(false);


  return (
    <>
    <div
    style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%), url('../../images/photo_2024-09-13_16-58-24.jpg')` }}
    className={`w-full bg-cover bg-center h-screen`}
    >
      <div className='md:w-[700px] flex justify-center items-start flex-col h-full overflow-hidden'>

   <h1 className='text-4xl md:text-6xl text-white uppercase my-5 mx-6 leading-[3rem] md:leading-[4.4rem] animate-pulse' style={{ fontFamily: 'BebasNeue' }}><span className='px-2'>Welcome to</span>  Pure Hill <span className='px-2 text-gray-400'>International </span>School</h1>
    <p className='text-white mx-6 animate-scaleUpCenter'>We are dedicated to building a strong academic foundation for children from creche to grade school. Our mission is to "Take the Lead" in providing an exceptional learning environment where your child can thrive and grow.</p>
      </div>
    <div className='rounded-full w-14 h-14 bg-rose-900 absolute right-1 bottom-1 grid place-items-center cursor-pointer animate-bounce' onMouseEnter={() => setHoverChats(true)} onMouseLeave={() => setHoverChats(false)} onClick={() => dispatch({type:'showChat', payload: handleShowChat = true})}>
    <AiFillMessage className='text-4xl text-white '/>
    </div>
    {hoverChat && <div className='absolute right-1 bg-white bottom-20 w-auto h-auto p-2 rounded-md'>
      <p className='text-rose-900'>Have a chat</p>
    </div>}
    </div>
    </>
  );
}


export default Home;

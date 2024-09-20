import React, { useEffect } from 'react';

function UserChat({ userdata, dispatch }) {

  useEffect(() => {
    const chats = localStorage.getItem('userData');
    if (chats) {
      dispatch({
        type: 'userData',
        payload: JSON.parse(chats),
      });
    }
  }, [dispatch]); 

  return (
    <div className=' flex flex-col gap-2 items-end py-9 px-2  h-[400px] overflow-auto'>
      {userdata && userdata.length > 0 ? (
        userdata.map((message, index) => (
          <>
          <div key={index} className='rounded-full bg-rose-900 shadow-lg w-fit px-3 py-2 text-white text-xs ml-40% max-w-56'>
            <p className='word-wrap'>{message.text}</p>
          </div>
            {<span className='text-gray-500 text-xs'>{message.time.slice(0,25)}</span> }
          </>
        ))
      ) : (
        <div className='text-gray-500'>No messages yet.</div>
      )}
    </div>
  );
}

export default UserChat;

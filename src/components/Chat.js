import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import InputMessage from './InputMessage'
import UserChat from './UserChat'

function Chat({dispatch, handleShowChat, chatsInputs, userdata}) {
  return (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 h-[auto] bg-white ${handleShowChat  && 'animate-animateShowChat'} overflow-auto`}>
        <nav className='bg-rose-900 w-full h-16 flex flex-row justify-between items-center'>
          <MdArrowBack  className='text-4xl text-white cursor-pointer' onClick={() => dispatch({type:'showChat', payload: handleShowChat = false})}/>
          <div className='flex flex-col justify-center items-start'>
        <h2 className='text-base text-white px-2'>A chat with school</h2>
        <span className='text-base text-white px-2'>Online 24/7</span>
          </div>
        </nav>
        <main className='p-3'>
          <div className='my-4'>
          {userdata.length === 0 && <span className='text-center text-rose-900'>Start a conversation</span>}
          </div>
          <UserChat dispatch={dispatch} userdata={userdata}/>
          <InputMessage chatsInputs={chatsInputs} dispatch={dispatch} userdata={userdata}/>
        </main>
    </div>
  )
}



export default Chat
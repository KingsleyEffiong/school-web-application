import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import InputMessage from './InputMessage'
import DisplayChats from './DisplayChats'

function Chat({dispatch, handleShowChat, CHATS_INPUTS, chats}) {
  return (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 h-[auto] bg-white ${handleShowChat  && 'animate-animateShowChat'} overflow-auto`}>
        <nav className='bg-rose-900 w-full h-16 flex flex-row justify-between items-center'>
          <MdArrowBack  className='text-4xl text-white cursor-pointer' onClick={() => dispatch({type:'showChat', payload: handleShowChat = false})}/>
          <div className='flex flex-col justify-center items-start'>
        <h2 className='text-base text-white px-2'>A chat with pure hill schools</h2>
        <span className='text-base text-white px-2'>Online 24/7</span>
          </div>
        </nav>
        <main className='p-3'>
          <div className='my-4'>
          {chats.length === 0 && <span className='rounded-full bg-rose-900 shadow-lg w-fit px-3 py-2 text-white text-xs ml-40% max-w-56'>Welcome to pure hill school, how can we be of assitance</span>}
          </div>
          <DisplayChats dispatch={dispatch} userdata={chats} CHATS_INPUTS={CHATS_INPUTS}/>
          <InputMessage CHATS_INPUTS={CHATS_INPUTS} dispatch={dispatch} chats={chats} />
        </main>
    </div>
  )
}



export default Chat
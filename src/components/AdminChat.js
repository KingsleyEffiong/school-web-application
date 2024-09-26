import React from 'react'
import { MdPerson } from 'react-icons/md'

function AdminChat() {
  return (
    <div className="w-full md:w-[70%] h-[900px] mt-32 mx-auto py-10">
          <nav className='bg-rose-700 w-fit h-16 flex flex-row justify-between items-center shadow-lg px-3'>
          <div className='flex flex-col justify-center items-start'>
        <h2 className='text-base text-white px-2'>Messages</h2>
          </div>
        </nav>
        <main className='w-full px-3 py-3 flex flex-col gap-3'>
          <div className='flex flex-row bg-white px-3 py-4 md:w-96 items-center rounded-lg cursor-pointer shadow-lg'>
            <MdPerson  className='text-5xl bg-rose-700 rounded-full text-white mx-2'/>
            <div className='flex flex-col'>
              <h3>User 1</h3>
              <h3>Can we meet</h3>
            </div>
          </div>
          <div className='flex flex-row bg-white px-3 py-4 md:w-96 items-center rounded-lg cursor-pointer shadow-lg'>
            <MdPerson  className='text-5xl bg-rose-700 rounded-full text-white mx-2'/>
            <div className='flex flex-col'>
              <h3>User 2</h3>
              <h3>Can we meet</h3>
            </div>
          </div>
          <div className='flex flex-row bg-white px-3 py-4 md:w-96 items-center rounded-lg cursor-pointer shadow-lg'>
            <MdPerson  className='text-5xl bg-rose-700 rounded-full text-white mx-2'/>
            <div className='flex flex-col'>
              <h3>User 3</h3>
              <h3>Can we meet</h3>
            </div>
          </div>
        </main>
    </div>
  )
}

export default AdminChat
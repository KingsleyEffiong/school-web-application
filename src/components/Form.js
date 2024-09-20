import React from 'react'

function Form() {
  return (
    <div className='w-[40rem] h-auto bg-rose-900 shadow-lg absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
      <h1 className='text-white text-center text-3xl mt-3'>Sign in</h1>
    <form action='' className='w-full flex flex-col md:flex-row flex-wrap items-center md:justify-start md:items-start gap-5 px-4 text-white py-4'>
      <div className='w-72 '>
      <label htmlFor='name' className='my-4'>Ward's Name</label>
      <input type='text' name='name' className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white'/>
      </div>
      <div className='w-72 '>
      <label htmlFor='name' className='my-4'>Email Address</label>
      <input type='email' name='email' className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white'/>
      </div>
      <div className='w-72 '>
      <label htmlFor='name' className='my-4'>Username</label>
      <input type='name' name='name' className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white'/>
      </div>
      <div className='w-72 '>
      <label htmlFor='name' className='my-4'>Phone Number</label>
      <input type='text' name='text' className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white'/>
      </div>
      <button className='bg-white w-72 text-rose-900 py-3 px-4 my-3 rounded-md'>Submit</button>
    </form>
    </div>
  )
}

export default Form
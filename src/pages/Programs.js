import React from 'react'

function Programs() {
  return (
    <div className='w-full h-fit bg-gray-500 p-7 overflow-hidden'>
    <h1 className='pt-44 text-center text-4xl text-white animate-scaleUpCenter'>Our Programs</h1>
    <div className='flex flex-row flex-wrap justify-center w-[80%] m-auto px-7'>
      {/* First Row */}
      <div className='flex flex-row flex-wrap  justify-around items-center m-10 px-7'>
        <div className='w-96 m-4'>
          <h2 className='bg-rose-900 text-white py-4 px-5 w-fit animate-scaleUpCenter'>Creche</h2>
          <p className='text-1xl md:text-2xl animate-scaleUpCenter'>A nurturing space for the youngest learners, where care and learning go hand in hand.</p>
        </div>
        <div className='h-96 w-96 overflow-hidden rounded-lg shadow-xl'>
          <img src='../../images/photo_2024-09-13_16-58-33.jpg' className='h-96 w-96 animate-pulse' alt=''/>
        </div>
      </div>
      
      {/* Second Row (reverse order) */}
      <div className='flex flex-row-reverse flex-wrap  justify-around items-center m-10 px-3'>
        <div className='w-96 m-4'>
          <h2 className='bg-rose-900 text-white py-4 px-5 w-fit animate-scaleUpCenter'>Pre-School</h2>
          <p className='text-1xl md:text-2xl animate-scaleUpCenter'> Building the first steps in education through engaging activities and foundational skills</p>
        </div>
        <div className='h-96 w-96  overflow-hidden rounded-lg shadow-xl'>
          <img src='../../images/photo_2024-09-13_16-59-27.jpg' className='h-96 w-96 animate-pulse' alt=''/>
        </div>
      </div>
      
      {/* Third Row */}
      <div className='flex flex-row flex-wrap  justify-around items-center m-10 px-3'>
        <div className='w-96 m-4'>
          <h2 className='bg-rose-900 text-white py-4 px-5 w-fit animate-scaleUpCenter'>Grade School</h2>
          <p className='text-1xl md:text-2xl animate-scaleUpCenter'>Preparing students for academic excellence with a curriculum that promotes critical thinking and creativity.</p>
        </div>
        <div className='h-96 w-96  overflow-hidden rounded-lg shadow-xl'>
          <img src='../../images/photo_2024-09-13_16-59-05.jpg' className='h-96 w-96 animate-pulse' alt=''/>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Programs
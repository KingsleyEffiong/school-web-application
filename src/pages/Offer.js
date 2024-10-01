import React from 'react'

function Offer() {
  return (
    <div className='w-full h-fit bg-gray-500'>
      <h1 className='pt-44 text-center text-4xl text-white animate-scaleUpCenter'>What we offer</h1>
      <div className='flex flex-row flex-wrap justify-center w-[80%] m-auto'>
        <ul className='list-disc ml-6'>
          <li className='my-3 md:text-xl animate-scaleUpCenter'>Small Class Sizes – To ensure individualized attention for every child</li>
          <li className='my-3 md:text-xl animate-scaleUpCenter'>Enriching Extracurricular Activities – From sports to arts, we offer a range of activities to develop well-rounded students.</li>
          <li className='my-3 md:text-xl animate-scaleUpCenter'>Parent-Teacher Collaboration – Open communication between parents and teachers to support each child's growth.</li>
          <li className='my-3 md:text-xl animate-scaleUpCenter'>Continuous Professional Development for Teachers – Our staff continually updates their skills to provide the best learning experiences.</li>
          <li className='my-3 md:text-xl animate-scaleUpCenter'>A Place of Lasting Memories and Academic Excellence.</li>
        </ul>
      </div>
    </div>
  )
}

export default Offer;

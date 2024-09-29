import React from 'react'

function DarkBackground({closeSelectedChatId}) {
  return (
    <div className='bg-black opacity-75 fixed z-20 top-0 left-0 w-full h-full' onClick={() =>closeSelectedChatId(null)}></div>
  )
}

export default DarkBackground
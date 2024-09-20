import React from 'react'

function InputMessage({chatsInputs, dispatch, userdata}){


  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSendData()
    }
  }
  document.addEventListener('keypress', handleKeyPress);

  function handleSendData(){
    const newMessage = {
      text: chatsInputs,
      time: new Date().toString(),
    };

    


    const updateduserdata = [...userdata, newMessage];
    localStorage.setItem('userData', JSON.stringify(updateduserdata))
    dispatch({
      type:'userData',
      payload:  updateduserdata
    })
    dispatch({
      type:'UserChatInputs',
      payload:  ''
    })
  }
    return(
      <div className='flex flex-row justify-between items-center w-full'>
        <input type='text' name='text' className=' border-rose-900 border-4 w-60 h-10 text-rose-900 rounded-full outline-none py-1 px-3 ml-3 outline-white bg-gray-50' value={chatsInputs} onChange={(e) => dispatch({type:'UserChatInputs', payload:e.target.value})}/>
        <button className='bg-white  text-rose-900 py-1  px-2 rounded-md hover:bg-rose-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-rose-600 focus:ring-offset-2 focus:bg-rose-600 focus:text-white' onClick={handleSendData}>Send</button>
      </div>
    )
  }

export default InputMessage
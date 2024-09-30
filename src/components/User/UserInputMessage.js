import React, { useEffect, useRef, useState } from 'react';
import { doc, setDoc, updateDoc, arrayUnion, getDoc, Timestamp } from "firebase/firestore";
import { db } from '../../Firebase'; // Your Firestore setup

function InputMessage({ CHATS_INPUTS, dispatch, updateChat }) {
const [disabled_input, setDisabledInput] = useState(false);
const [networkMessage, setNetworkMessage] = useState(false)
const inputRef = useRef(null)
  const generateParentId = function() {
      let parentId = localStorage.getItem('parentId');
  
      if (!parentId) {
          parentId = `parent${Date.now()}_${Math.random().toString(32).substring(2,9)}`;
          localStorage.setItem('parentId', parentId);
      }
      return parentId;
  };
  

  useEffect(() =>{
    inputRef.current.focus();
  },[CHATS_INPUTS]);

  
  async function handleChat_inputs() {
    if (CHATS_INPUTS === '') return;
  

    let parentId = generateParentId(); 
    
    // Reference to the parent chat document
    const parentDocRef = doc(db, "chats", parentId);
    setDisabledInput(true)
  
    try {
        const currentTimestamp = Timestamp.now();
  
        // Check if the document for the parent exists
        const docSnapshot = await getDoc(parentDocRef);
  
        if (docSnapshot.exists()) {
            // Update the existing document by adding a new message
            await updateDoc(parentDocRef, {
                messages: arrayUnion({
                    message: CHATS_INPUTS,
                    timestamp: currentTimestamp, 
                    isFromAdmin: false // Specify that the message is from the parent
                })
            });
        } else {
            // Create the document with the first message
            await setDoc(parentDocRef, {
                messages: [{
                    message: CHATS_INPUTS,
                    timestamp: currentTimestamp, 
                    isFromAdmin: false
                }],
                createdAt: currentTimestamp // Optionally track when the chat was created
            });
        }
        dispatch({ type: 'CHATS_INPUTS', payload: CHATS_INPUTS = '' });
        setDisabledInput(false);
        console.log('Message delivered');
    } catch (err) {
        console.log('Error sending message:', err);
        if (err.message.includes('Failed to get document because the client is offline')) {
            setNetworkMessage(true);
        } else {
            console.log('An unexpected error occurred:', err.message);
        }
        setDisabledInput(false);
    }
    finally{
      dispatch({type:'update_chat', payload: updateChat === false ? updateChat = true : updateChat =  false});
      console.log(updateChat);
    }
  }
  
  useEffect(() =>{
    function handleKeypress(event){
      if(event.code === 'Enter')handleChat_inputs();
      else return;
    }
  
    document.addEventListener('keypress', handleKeypress)
    return () => document.removeEventListener('keypress', handleKeypress)
  },[CHATS_INPUTS]);

  if(networkMessage){
    return <div className='text-rose-700'>Network Error: Please check your internet connection..</div>
  }

  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <input 
        type='text' 
        name='text' 
        className='border-rose-900 border-4 w-60 h-10 text-rose-900 rounded-full outline-none py-1 px-3 ml-3 outline-white bg-gray-50' 
        value={CHATS_INPUTS} 
        disabled={disabled_input}
        ref={inputRef}
        onChange={(e) => dispatch({ type: 'CHATS_INPUTS', payload: e.target.value })}
      />
      <button className='bg-white text-rose-900 py-1 px-2 rounded-md hover:bg-rose-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-rose-600 focus:ring-offset-2 focus:bg-rose-600 focus:text-white text-xs' onClick={handleChat_inputs}
      disabled={disabled_input}>Send</button>
    </div>
  );
}

export default InputMessage;

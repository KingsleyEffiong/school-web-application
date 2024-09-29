import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Make sure to import your Firestore instance

function DisplayChats({ updateChat, internetError, dispatch }) {
  const [chats, setChats] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const parentId = localStorage.getItem('parentId');


  useEffect(() => {
    // Fetch the chat document based on the parentId (used as the document ID)
    const fetchChats = async () => {

      try {
        const parentDocRef = doc(db, 'chats', parentId); // Get reference to the document using parentId
        const docSnapshot = await getDoc(parentDocRef);
  
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data().messages || []; // Get messages array
          setChats(chatData);
        } else {
          console.log('No chat document found for this parent.');
        }
      } catch (err) {
        console.error('Error fetching chats:', err);
        if (err.message.includes('Failed to get document because the client is offline')) {
          setNetworkError(true);
        } else {
          console.log('An unexpected error occurred:', err.message);
        }
      }
    };
  
    // Fetch chats on mount if parentId is available
    if (parentId) {
      fetchChats();
    }
  
    // Set up an interval to fetch chats every second
    const intervalId = setInterval(() => {
      if (parentId) {
        fetchChats(); 
      }
    }, 1000); // 1000ms = 1 second
  
    return () => clearInterval(intervalId);
    
  }, [parentId, updateChat]); 
  

  if(networkError){
    return <div className='text-rose-700'>Network Error: Please check your internet connection and refresh the page.....</div>
  }

  return (
    <div className={`flex flex-col gap-2 py-9 px-2 h-auto md:h-[400px] overflow-auto`}>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index} className='flex flex-col'>
            <div className={`rounded-full shadow-lg w-fit px-3 py-2 text-white text-xs ${chat.isFromAdmin ? 'bg-[#233264] mr-auto' : 'bg-rose-900 ml-auto'} max-w-56`}>
              <p className='word-wrap'>{chat.message}</p>
            </div>
           
            <span className={`text-gray-500 text-[8px] ${chat.isFromAdmin ? 'text-left' : 'text-right'}`}>
              {chat.timestamp?.toDate().toLocaleString()}
            </span>
          </div>
        ))
      ) : (
       <div className='text-gray-500'>No messages yet.</div>
      )}
    </div>
  );
}

export default DisplayChats;

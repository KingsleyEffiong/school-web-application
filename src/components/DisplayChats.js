import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Make sure to import your Firestore instance

function DisplayChats({ updateChat, internetError, dispatch }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const parentId = localStorage.getItem('parentId');
  
  useEffect(() => {
    // Fetch the chat document based on the parentId (used as the document ID)
    const fetchChats = async () => {
      setLoading(true);
      try {
        const parentDocRef = doc(db, 'chats', parentId); // Get reference to the document using parentId
        const docSnapshot = await getDoc(parentDocRef);

        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data().messages || []; // Get messages array
          setChats(chatData);
        } else {
          console.log('No chat document found for this parent.');
        }
        setLoading(false);
        if (updateChat) return;
      } catch (err) {
        console.error('Error fetching chats:', err);
        setLoading(false);
        if (err.message.includes('Failed to get document because the client is offline')) {
          alert('FirebaseError: The client is offline, please check your internet connection.');
          dispatch({ type: "INTERNET_FAILURE", payload: { internetError: err.message } });
        } else {
          console.log('An unexpected error occurred:', err.message);
        }
      }
    };

    if (parentId) {
      fetchChats();
    }
  }, [parentId, updateChat]);

  if (loading) {
    return <div className='text-rose-700'>Loading chats...</div>;
  }

  return (
    <div className={`flex flex-col gap-2 py-9 px-2 h-[200px] overflow-auto`}>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index} className='flex flex-col'>
            {/* Display the message based on whether it's from admin or user */}
            <div className={`rounded-full shadow-lg w-fit px-3 py-2 text-white text-xs ${chat.isFromAdmin ? 'bg-[#233264] ml-auto' : 'bg-rose-900 mr-auto'} max-w-56`}>
              <p className='word-wrap'>{chat.message}</p>
            </div>
            {/* Display the timestamp below the message */}
            <span className={`text-gray-500 text-[8px] ${chat.isFromAdmin ? 'text-right' : 'text-left'}`}>
              {chat.timestamp?.toDate().toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        !internetError === null ? internetError : <div className='text-gray-500'>No messages yet.</div>
      )}
    </div>
  );
}

export default DisplayChats;

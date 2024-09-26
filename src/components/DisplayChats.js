import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Make sure to import your Firestore instance

function DisplayChats({CHATS_INPUTS}) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);


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
      setLoading(false);
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };

  if (parentId) {
    fetchChats();
  }
  }, [parentId, CHATS_INPUTS]);

  if (loading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className='flex flex-col gap-2 items-end py-9 px-2 h-[400px] overflow-auto'>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index} className='w-full'>
            <div className={`rounded-full shadow-lg w-fit px-3 py-2 text-white text-xs ${chat.isFromAdmin ? 'bg-blue-500 ml-auto' : 'bg-rose-900 mr-auto'} max-w-56`}>
              <p className='word-wrap'>{chat.message}</p>
            </div>
            <span className='text-gray-500 text-[8px]'>{chat.timestamp?.toDate().toLocaleString()}</span>
          </div>
        ))
      ) : (
        <div className='text-gray-500'>No messages yet.</div>
      )}
    </div>
  );
}

export default DisplayChats;

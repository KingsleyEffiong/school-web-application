import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase'; // Your Firestore instance
import DisplayAdminChat from './DiaplayAdminChats';

function AdminChat() {
  const [userChats, setUserChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null); // State to track the selected chat
  const [loadingChat, setLoadingChat] = useState(false)

  useEffect(() => {
    async function fetchLatestChats() {
      setLoadingChat(true);
      try {
        // Fetch all documents from the 'chats' collection
        const querySnapshot = await getDocs(collection(db, 'chats'));
        
        const chats = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const lastMessage = data.messages[data.messages.length - 1]; // Get only the last message
          
          return {
            id: doc.id, // parent chat ID (document ID)
            lastMessage, // Only the last message
            createdAt: data.createdAt // Optionally keep track of when the chat was created
          };
        });
        
        setUserChats(chats); // Set the latest chats in the state
      } catch (err) {
        console.error('Error fetching user chats:', err);
      }
      finally{
        setLoadingChat(false);
      }
    }

    fetchLatestChats();
  }, []); 

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId); // Set the selected chat ID
  };

  if(loadingChat) {
    return(
      <div className="flex items-center justify-center h-screen">
      <h2 className="text-lg">Loading Chat...</h2>
    </div>
    )
  }
 
  return (
    <div className="w-full md:w-[70%] h-[900px] mt-32 mx-auto py-10">
      <nav className='bg-rose-700 w-fit h-16 flex flex-row justify-between items-center shadow-lg px-3'>
        <div className='flex flex-col justify-center items-start'>
          <h2 className='text-base text-white px-2'>Messages</h2>
        </div>
      </nav>
      <main className='w-full px-3 py-3 flex flex-col gap-3'>
        {userChats.length > 0 ? (
          userChats.map((chat) => (
            <div key={chat.id} className='mb-5' onClick={() => handleChatClick(chat.id)}>
              {chat.lastMessage ? (
                <div className='flex flex-row bg-white px-3 py-4 md:w-96 items-center rounded-lg cursor-pointer shadow-lg'>
                  <MdPerson className='text-5xl bg-rose-700 rounded-full text-white mx-2' />
                  <div className='flex flex-col'>
                    <h3>{chat.lastMessage.isFromAdmin ? 'Admin' : chat.id}</h3>
                    <h3>{chat.lastMessage.message}</h3>
                    <span className='text-xs text-gray-500'>
                      {new Date(chat.lastMessage.timestamp.seconds * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p>No messages yet in this chat.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">No user chats available.</p>
        )}
      </main>

      {/* Render the DisplayAdminChat component conditionally, based on selected chat */}
      {selectedChatId  ? (<DisplayAdminChat parentId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
     ):
      null}
    </div>
  );
}

export default AdminChat;

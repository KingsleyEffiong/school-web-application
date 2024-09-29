import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase'; // Your Firestore instance
import DisplayAdminChat from './DiaplayAdminChats';

function AdminChat({ updateChat, dispatch, CHATS_INPUTS }) {
  const [userChats, setUserChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null); // State to track the selected chat
  const [loadingChat, setLoadingChat] = useState(true); // Initial loading state for the first fetch

  // Fetch chats from Firestore
  const fetchLatestChats = async (showLoading = false) => {
    // Show loading only for the initial load
    if (showLoading) setLoadingChat(true);
    
    try {
      // Fetch all documents from the 'chats' collection
      const querySnapshot = await getDocs(collection(db, 'chats'));

      const chats = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const lastMessage = data.messages[data.messages.length - 1]; // Get only the last message

        return {
          id: doc.id, // parent chat ID (document ID)
          lastMessage, // Only the last message
          createdAt: data.createdAt, // Optionally keep track of when the chat was created
        };
      });

      setUserChats(chats); // Set the latest chats in the state
    } catch (err) {
      console.error('Error fetching user chats:', err);
    } finally {
      // Only set loading to false after the initial fetch
      if (showLoading) setLoadingChat(false);
    }
  };

  useEffect(() => {
    // Fetch chats on initial mount (with loading)
    fetchLatestChats(true);

    // Set up an interval to silently fetch chats every second (without loading)
    const intervalId = setInterval(() => {
      fetchLatestChats(false); // No loading for background updates
    }, 1000); // 1000ms = 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run this only once on mount

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId); // Set the selected chat ID
  };


  // Count how many chats the admin has not answered
  const unansweredChatsCount = userChats.filter(chat => chat.lastMessage && !chat.lastMessage.isFromAdmin).length;

  if (loadingChat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-lg">Loading Chat...</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] h-[900px] mt-32 mx-auto py-10">
      <nav className='bg-rose-700 w-fit h-16 flex flex-row justify-between items-center shadow-lg px-3'>
        <div className='flex flex-col justify-center items-start'>
          <h2 className='text-base text-white px-2'>Messages</h2>
          <span className='text-sm text-gray-200'>{`Unanswered Chats: ${unansweredChatsCount}`}</span>
        </div>
      </nav>
      <main className='w-full px-3 py-3 flex flex-col gap-3'>
        {userChats.length > 0 ? (
          userChats.map((chat) => (
            <div key={chat.id} className='mb-5 max:w-[250px] min:w-[250px]' onClick={() => handleChatClick(chat.id)}>
              {chat.lastMessage ? (
                <div className='flex flex-row bg-white px-3 py-4 md:w-96 items-center rounded-lg cursor-pointer shadow-lg relative'>
                  {/* Badge for unanswered messages */}
                  {!chat.lastMessage.isFromAdmin && (
                    <div className="w-3rem h-3rem rounded-full absolute top-[-15px] right-0 bg-red-900 text-white px-2 py-1">
                      No reply yet
                    </div>
                  )}
                  <MdPerson className='text-5xl bg-rose-700 rounded-full text-white mx-2' />
                  <div className='flex flex-col'>
                    <h3>{chat.lastMessage.isFromAdmin ? 'Admin' : chat.id}</h3>
                    <h3>{chat.lastMessage.message.length > 12 ? `${chat.lastMessage.message.slice(0, 12)}...` : chat.lastMessage.message}</h3>

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
      {selectedChatId ? (
        <DisplayAdminChat
          parentId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          updateChat={updateChat}
          dispatch={dispatch}
          CHATS_INPUTS={CHATS_INPUTS}
        />
      ) : null}
    </div>
  );
}

export default AdminChat;

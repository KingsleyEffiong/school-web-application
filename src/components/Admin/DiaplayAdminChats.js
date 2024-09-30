// The EachChat component is unchanged from the previous implementation
import React, { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase'; // Your Firestore instance
import DarkBackground from '../../UI/DarkBackground';

function DisplayAdminChat({ parentId, setSelectedChatId}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [disabled_input, setDisabledInput] = useState(false);
  const [adminMessage, setAdminMessage] = useState('');
  const chatContainerRef = useRef(null);

  // Fetch the chat messages for the active chat (based on parentId)
  useEffect(() => {
    async function fetchChatMessages() {
      try {
        const parentDocRef = doc(db, 'chats', parentId);
        const docSnapshot = await getDoc(parentDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setChatMessages(data.messages || []); // Set the messages array
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    }
  
    // Fetch chat messages immediately when parentId changes
    fetchChatMessages();
  
    // Only set interval if updateChat is true
    let intervalId;
      intervalId = setInterval(() => {
        fetchChatMessages(); // Fetch chat messages in the background
      }, 1000); // Run every second
  
    // Cleanup the interval when updateChat becomes false or the component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  
  }, [parentId]); // Dependency array includes parentId and updateChat
  

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
  
    // Function to determine if the user is at the bottom of the chat
    const isUserNearBottom = () => {
      return (
        chatContainer &&
        chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 50
      );
    };
  
    // Auto-scroll only if the user is near the bottom
    if (isUserNearBottom()) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  
  }, [chatMessages]);
  

  // Function to handle sending an admin message
  const sendMessage = async () => {
    if (adminMessage.trim() === '') return;
    setDisabledInput(true);
    const newMessage = {
      message: adminMessage,
      timestamp: Timestamp.now(),
      isFromAdmin: true // This specifies the message is from the admin
    };

    try {
      const parentDocRef = doc(db, 'chats', parentId);

      // Update Firestore with the new message
      await updateDoc(parentDocRef, {
        messages: arrayUnion(newMessage)
      });

      // Update local state to display the new message immediately
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setAdminMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
    finally{
      setDisabledInput(false)
    }
  };


  useEffect(() =>{
    function handleKeypress(event){
      if(event.code === 'Enter')sendMessage();
      else return;
    }
  
    document.addEventListener('keypress', handleKeypress)
    return () => document.removeEventListener('keypress', handleKeypress)
  },[sendMessage]);


  return (
    <>
    <div className='flex flex-col gap-2  py-9 px-4 w-[22rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto h-[500px] z-30 bg-white rounded-2xl' ref={chatContainerRef}>
      {chatMessages.length > 0 ? (
        chatMessages.map((msg, index) => (
          <div key={index} className='flex flex-col'>
            <div className={`rounded-full shadow-lg w-fit px-3 py-2 text-white text-xs ${msg.isFromAdmin ? 'bg-[#233264] ml-auto' : 'bg-rose-900 mr-auto'} max-w-56`}>
              <p className='word-wrap'>{msg.message}</p>
            </div>
            <span className={`text-gray-500 text-[8px] ${msg.isFromAdmin ? ' ml-auto' : ' mr-auto'}`}>{new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}</span>
          </div>
        ))
      ) : (
        <div className='text-gray-500'>No messages yet.</div>
      )}
      {/* Input field for the admin to send a reply */}
      <div className="flex justify-around w-full mt-auto">
        <input
          type="text"
          className="border-rose-900 border-4 w-60 h-10 text-rose-900 rounded-full outline-none py-1 px-3 ml-3 outline-white bg-gray-50"
          placeholder="Type a message..."
          value={adminMessage}
          onChange={(e) => setAdminMessage(e.target.value)}
        />
        <button
          className="bg-white text-rose-900 py-1 px-2 rounded-md hover:bg-rose-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring focus:ring-rose-600 focus:ring-offset-2 focus:bg-rose-600 focus:text-white text-xs"
          onClick={sendMessage}
          disabled={disabled_input}
        >
          Send
        </button>
      </div>
    </div>
    <DarkBackground closeSelectedChatId={setSelectedChatId}/>
    </>
  );
}

export default DisplayAdminChat;

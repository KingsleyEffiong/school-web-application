import Navbar from "./components/Navbar";
import React, { useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Form from "./components/Form";
import Chat from "./components/Chat";
import DarkBackground from "./UI/DarkBackground";

// Define initial state
const initialState = {
  responsive: false,
  toggleMenu:false,
  showChat: false,
  chatsInputs: '',
  userdata:[],
};


// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'userData' :
      return{
        ...state,
        userdata: action.payload
      }
    case 'MD' :
      return {
        ...state,
        responsive: action.payload,
      };

    case 'Menu' : 
      return{
        ...state,
        toggleMenu: action.payload
      };

    case 'showChat' :
     return {
      ...state,
      showChat: action.payload
    }
    case 'UserChatInputs' :

      return {
        ...state,
        chatsInputs: action.payload
      }
    default:
      return state;
  }
}

function App() {
  // Use the reducer and initial state
  const [{responsive, toggleMenu, showChat, chatsInputs, userdata}, dispatch] = useReducer(reducer, initialState);
  

  function handleShowMenu(){
    dispatch({type:'Menu', payload: !toggleMenu})
  }
  function handleCloseMenu(){
    dispatch({type:'Menu', payload: !toggleMenu});
  }
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'MD',
        payload: window.innerWidth <= 954,
      });
      if(window.innerWidth >= 954){
        dispatch({type:'Menu', payload: toggleMenu});
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-200 w-full">
      <BrowserRouter>
      <Navbar responsive={responsive} handleShowMenu={handleShowMenu} toggleMenu={toggleMenu} handleCloseMenu={handleCloseMenu}/>
      <Routes>
        <Route path="/" element={<Home dispatch={dispatch} handleShowChat={showChat}/>}></Route>
        <Route path="program" element={<Programs/>}></Route>
        <Route path="offer" element={<Offer/>}></Route>
        <Route path="contact" element={<Contact/>}></Route>
      </Routes>
      {/* <DarkBackground />
      <Form /> */}
     {showChat &&  <Chat dispatch={dispatch} handleShowChat={showChat} chatsInputs={chatsInputs} userdata={userdata} /> }
      </BrowserRouter>
    </div>
  );
}

export default App;

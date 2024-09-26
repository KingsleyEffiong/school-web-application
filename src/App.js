import Navbar from "./components/Navbar";
import React, { useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminChat from "./components/AdminChat";
import Chat from "./components/Chat";


// Define initial state
const initialState = {
  responsive: false,
  toggleMenu:false,
  showChat: false,
  CHATS_INPUTS: '',
  chats:[],
  SET_EMAIL:'',
  SET_PASSWORD:'',
  isLoading: false,
  loginError:null,
};


// Reducer function
function reducer(state, action) {
  switch (action.type) {
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

    case 'SET_EMAIL' :
      return{
        ...state,
        SET_EMAIL: action.payload
      }
    case 'SET_PASSWORD' :
      return{
        ...state,
        SET_PASSWORD: action.payload
      }
    case 'LOGIN_REQUEST' :
      return{
        ...state,
        isLoading: true,
        loginError:null,
      }
    case 'LOGIN_SUCCESS' :
      return{
        ...state,
        isLoading: false,
        isAuthenticated: true,
      }
    case 'LOGIN_FAILURE' :
      return{
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginError: action.payload.error
      }
    case 'Chats' :
      return{
        ...state,
        chats: action.payload
      }
    case 'CHATS_INPUTS' :
      return{
        ...state,
        CHATS_INPUTS: action.payload
      }
    default:
      return state;
  }
}

function App() {
  // Use the reducer and initial state
  const [{responsive, toggleMenu, showChat, chats, CHATS_INPUTS, SET_EMAIL, SET_PASSWORD, isLoading, loginError}, dispatch] = useReducer(reducer, initialState);
  

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
        <Route path="phs_admin_login" element={<Login dispatch={dispatch} SET_EMAIL={SET_EMAIL} SET_PASSWORD={SET_PASSWORD} isLoading={isLoading} loginError={loginError}/>}></Route>
        <Route path="phs_admin_chat" element={<AdminChat/>} ></Route>
      </Routes>
     {showChat &&  <Chat dispatch={dispatch} handleShowChat={showChat} CHATS_INPUTS={CHATS_INPUTS} chats={chats} /> }
      </BrowserRouter>
    </div>
  );
}

export default App;

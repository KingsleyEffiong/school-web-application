import Navbar from "./components/Navbar";
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from './Firebase'; // Import your Firebase auth
import { onAuthStateChanged } from 'firebase/auth'; // Import the method
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminChat from "./components/Admin/AdminChat";
import UserChat from "./components/User/UserChat";
import PageNotFound from "./pages/PageNotFound";

// Define initial state
const initialState = {
  responsive: false,
  toggleMenu: false,
  showChat: false,
  CHATS_INPUTS: '',
  SET_EMAIL: '',
  SET_PASSWORD: '',
  isLoading: false,
  loginError: '',
  updateChat: false,
  internetError: null,
  isAuthenticated: false,
  checkingAuth: true,
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
        isLoading: action.payload.isLoading,
        loginError:null,
      }
      case 'CHECKING_AUTH':
        return {
          ...state,
          checkingAuth: action.payload,
        };
  
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          checkingAuth: false, // Set to false once checked
        };
        case 'LOGIN_FAILED':
          console.log('LOGIN_FAILED action dispatched with error:', action.payload.error);
          return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            loginError: action.payload.error,
          };
        
    case 'CHATS_INPUTS' :
      return{
        ...state,
        CHATS_INPUTS: action.payload
      }
      
    case 'update_chat' :
      return{
        ...state,
        updateChat: action.payload
      }
    case 'INTERNET_FAILURE' :
      return{
        ...state,
        internetError: action.payload.err
      }
    default:
      return state;
  }
}

function App() {

  // Use the reducer and initial state
  const [{ responsive, toggleMenu, showChat, CHATS_INPUTS, SET_EMAIL, SET_PASSWORD, isAuthenticated, isLoading, loginError, updateChat, internetError, checkingAuth }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'CHECKING_AUTH', payload: false }); // Indicate that checking is complete

      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: { error: null } });
      }
    });
    return () => unsubscribe();
  }, []);

  function handleShowMenu() {
    dispatch({ type: 'Menu', payload: !toggleMenu });
  }

  function handleCloseMenu() {
    dispatch({ type: 'Menu', payload: !toggleMenu });
  }

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'MD',
        payload: window.innerWidth <= 954,
      });
      if (window.innerWidth >= 954) {
        dispatch({ type: 'Menu', payload: toggleMenu });
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
  <Navbar responsive={responsive} handleShowMenu={handleShowMenu} toggleMenu={toggleMenu} handleCloseMenu={handleCloseMenu} />

  <Routes>
    <Route path="/" element={<Home dispatch={dispatch} handleShowChat={showChat} />} />
    <Route path="program" element={<Programs />} />
    <Route path="offer" element={<Offer />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<PageNotFound />} />
    <Route
      path="phs_admin_login"
      element={
        <Login
          dispatch={dispatch}
          SET_EMAIL={SET_EMAIL}
          SET_PASSWORD={SET_PASSWORD}
          isLoading={isLoading}
          loginError={loginError}
        />
      }
    />
    <Route
      path="phs_admin_chat"
      element={
        checkingAuth ? (
          <div className="flex items-center justify-center h-screen">
            <h2 className="text-lg">Checking Authentication...</h2>
          </div>
        ) : isAuthenticated ? (
          <AdminChat updateChat={updateChat} dispatch={dispatch} CHATS_INPUTS={CHATS_INPUTS}/>
        ) : (
          <Login
            dispatch={dispatch}
            SET_EMAIL={SET_EMAIL}
            SET_PASSWORD={SET_PASSWORD}
            isLoading={isLoading}
            loginError={loginError}
          />
        )
      }
    />
  </Routes>

  {showChat && (
    <UserChat
      dispatch={dispatch}
      handleShowChat={showChat}
      CHATS_INPUTS={CHATS_INPUTS}
      updateChat={updateChat}
      internetError={internetError}
    />
  )}
</BrowserRouter>
    </div>
  );
}
export default App;

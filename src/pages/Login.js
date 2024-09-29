import React from 'react';
import { auth } from '../Firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Form({ dispatch, SET_EMAIL, SET_PASSWORD, isLoading, loginError, }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  async function handleLogin() {
    dispatch({ type: 'LOGIN_REQUEST', payload: { isLoading: true } });
    console.log('Loading first')
    try {
      const userCredential = await signInWithEmailAndPassword(auth, SET_EMAIL, SET_PASSWORD);
      console.log(userCredential);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userCredential.user } });
      navigate('/phs_admin_chat');

    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOGIN_FAILURE', payload: { loginError: error.message } });
      dispatch({ type: 'LOGIN_REQUEST', payload: { isLoading: false } });
    }
    finally{
      dispatch({ type: 'LOGIN_REQUEST', payload: { isLoading: false } });
      console.log('Loading finally')
    }
  }

  return (
    <div className='w-[40rem] h-auto bg-rose-900 shadow-lg absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
      <h1 className='text-white text-center text-3xl mt-3'>Admin Login</h1>
      <form className='w-full flex flex-col md:flex-row flex-wrap items-center md:justify-start md:items-start gap-5 px-4 text-white py-4'>
        <div className='w-72 '>
          <label htmlFor='email' className='my-4'>Email</label>
          <input 
            type='email' 
            id='email' 
            className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white' 
            value={SET_EMAIL} 
            onChange={(e) => dispatch({type:'SET_EMAIL', payload: e.target.value})}
          />
        </div>
        <div className='w-72 '>
          <label htmlFor='password' className='my-4'>Password</label>
          <input 
            type='password' 
            id='password' 
            className='border border-rose-900 w-full text-rose-900 py-3 px-4 my-1 rounded-md outline-none outline-white' 
            value={SET_PASSWORD} 
            onChange={(e) => dispatch({type:'SET_PASSWORD', payload: e.target.value})}
          />
        </div>
        {loginError && <p className='text-red-500'>{loginError}</p>}
        <button 
          type='button' 
          className='bg-white w-72 text-rose-900 py-3 px-4 my-3 rounded-md' 
          onClick={handleLogin} 
          disabled={isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Form;

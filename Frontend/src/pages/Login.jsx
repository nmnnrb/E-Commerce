import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('user@login.com');
  const [email, setEmail] = useState('user@login.com');
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  
  // Close popup when clicking the close button
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Automatically close popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (response.data.sucess) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.sucess) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  // Debugging the showPopup state to ensure it's working
  useEffect(() => {
    console.log('Popup visibility:', showPopup); // Log the popup state
  }, [showPopup]);

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      
      {/* Popup Section */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">**ATTENTION!!</h2>
            <p className="text-gray-600 mb-6">
              For testing purposes, make sure the backend is up and running. As the project is hosted on the free server, it will take some time to fully work in production.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <hr className='border-none h-[2.5px] w-12 bg-gray-800'/>
        <p className='prata-regular text-3xl'> {currentState}</p>
        <hr className='border-none h-[2.5px] w-12 bg-gray-800'/>
      </div>

      {currentState === 'Login' ? null : (
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-gray-800" 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          required 
        />
      )}

      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type="email" 
        className="w-full px-3 py-2 border border-gray-800" 
        placeholder='Email' 
        required 
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type="password" 
        className="w-full px-3 py-2 border border-gray-800" 
        placeholder='Password' 
        required 
      />
    <span className="w-full text-red-600 text-sm"> **Make sure the <span className='text-md font-black ' >backend is up and running.</span>  <span className='bg-blue-600 text-white px-2 py-1 rounded-md ' ><a  href='https://e-commerce-backend-8x0r.onrender.com/' >BackendURL</a> </span>  As the project is hosted on the free server, it will take some time to fully work in production. </span>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your Password?</p>
        {currentState === 'Login' ? (
          <p 
            onClick={() => setCurrentState('Sign Up')} 
            className='rounded-lg text-gray-500 cursor-pointer'
          >
            Create Account
          </p>
        ) : (
          <p 
            onClick={() => setCurrentState('Login')} 
            className='rounded-lg text-gray-500 cursor-pointer'
          >
            Login Here
          </p>
        )}
      </div>
      
      <button className='bg-orange-500 text-white px-6 py-2 rounded-xl'>
        {currentState === 'Sign Up' ? 'Sign Up' : 'Login'}
      </button>

    </form>
  );
};

export default Login;

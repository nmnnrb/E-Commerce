import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [currentState,setCurrentState] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        if(currentState === 'Sign Up') {
          const response = await axios.post(backendUrl + '/api/user/register' , {name, password, email});
          if(response.data.sucess){
          setToken(response.data.token);
          localStorage.setItem('token' , response.data.token)
          }else{
            toast.error(response.data.message)
          }
        }else{
            const response = await axios.post(backendUrl +'/api/user/login' , {email, password});
            if(response.data.sucess){
              setToken(response.data.token)
              localStorage.setItem('token' , response.data.token)
            }else{
            toast.error(response.data.message)

            }
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }


  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >
       <div className="inline-flex items-center gap-2 mb-2 mt-10">
       <hr className='border-none h-[2.5px] w-12 bg-gray-800'/>
          <p className='prata-regular text-3xl'> {currentState}</p>
          <hr className='border-none h-[2.5px] w-12 bg-gray-800'/>
       </div>
       {currentState === 'Login' ? null : <input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" onChange={(e) => setName(e.target.value) } value={name} required />}
       <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder='Email' required />
       <input  onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder='Password' required />

    <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className='cursor-pointer '>Forgot your Password?</p>
        {
          currentState === 'Login'? (
            <p onClick={() => setCurrentState('Sign Up')} className=' rounded-lg text-gray-500  cursor-pointer' >Create Account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='rounded-lg text-gray-500 cursor-pointer' >Login Here</p>
          )
        }
    </div>
        <button className='bg-orange-500 text-white px-6 py-2 rounded-xl' >{currentState === 'Sign Up' ? 'Sign Up' : 'Login'}</button>

    </form>
  )
}

export default Login
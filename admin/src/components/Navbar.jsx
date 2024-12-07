import React from 'react'
import {assets} from '../assets/assets'
import { toast } from 'react-toastify';
const Navbar = () => {
  const logoutBtn = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    toast.success("Logged out successfully")
  }
  return (
    <div className='flex items-center justify-between px-20 py-5' >
       <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={logoutBtn}  className='bg-orange-500 text-white px-6 py-3 rounded-xl ml-2 ' >Logout</button>
        </div>
  )
}

export default Navbar